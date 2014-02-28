---
layout: post
title: Video Capture and file upload with Cordova on iOS
description: ""
category: articles
tags: [mobile, video, cordova, ios]
comments: true
share: true
---

# Hacking Video Capture and File Uploads with cordova mobile development framework

With everything else about developing for mobile on cordova (in [ionic](http://ionicframework.com/) for a super-easy beautiful html framework) the documentation gets me only about 80% of the way to a funcitonal solution.  Quirks with the individual operating systems hinder finding working solutions and a fair amount of hacking is needed to implement the spec.

The project I've been working on for the past two weeks is a prototype and proof of concept for a crowdsourced video production platform, [ZipClips](http://zipclips.com).  

The most challenging technical aspects of putting this project together were video capture, which required a bit of configuration of the config.xml file.

{% highlight xml %}
<feature name="Camera">
    <param name="ios-package" value="CDVCamera" />
</feature>
<feature name="File">
    <param name="ios-package" value="CDVFile" />
</feature>
<feature name="FileTransfer">
    <param name="ios-package" value="CDVFileTransfer" />
</feature>
{% endhighlight %}

In the script, there's a getVideo method that I placed on the local $scope directive provided by [angularjs](http://angularjs.org/) that wraps up video capture.  This method then calls, with success and error callbacks, the captureVideo method provided by cordova.js.

{% highlight js %}
$scope.getVideo = function () {
  //success callback
  var captureSuccess = function (mediaFiles) {
    $scope.video = mediaFiles[0].fullPath;
    //...
    $scope.$digest();
    //...
  };
  //error callback
  var captureError = function (error) {
    //...
  };

  var capture = function () {
    //...
    navigator.device.capture.captureVideo(captureSuccess, captureError);
  };
  // run the above function
  capture();
}
{% endhighlight %}

This captureVideo method, on success, saves the path to the the captured video file to the video property on the $scope directive.  With this path, the file upload can proceeed.

Interestingly in angular, even thought the model was updated, for our project a $scope.$digest() call was required to repaint the view to update the video tag from the captured video and show the upload video button (hidden via ng-show).

Then once the upload video button is pressed, the uploadVideo method is called, which wraps up the video nicely and submits it via POST request to our API server which then pipes the file stream to an Amazon S3 storage bucket.

{% highlight js %}
$scope.uploadVideo = function () {

  var upload = function (videoURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    //create a unique file name based on the timestamp, use this in the server for time information, or time metadata in the video clip itself.
    options.fileName = "" + (new Date()).valueOf() + ".mov";
    options.mimeType = "video/mov";
    options.httpMethod = "POST";
    var ft = new FileTransfer();
    //this is needed to grab the file correctly on IOS
    videoURI = 'file://' + videoURI;  
    ft.upload(videoURI, "http://zipclips.herokuapp.com/clips", postSuccess, postFailure, options, true); //boolean is for trustAllHosts
  };

  var postSuccess = function (response) {
    //...
  };

  var postFailure = function (error) {
    //...
  };
  //call the upload function above with the video path on the scope
  upload($scope.video);
}
{% endhighlight %}

This code is similar to what you'll find in the cordova docs.  The tricky parts to figure out were how to find the local file path, prepending `'file://'` to the path returned by the videoCapture method call.  The `true` literal included in the ft.upload call allows for cross-origin post request.  

Some additional configuration for subsequent cross-origin GET requests in angular on ionic is requried.  Included in the config.xml file: 

{% highlight xml %}
<access origin="*" />
{% endhighlight %}

and in the angular module definition:

{% highlight js %}
app.config(function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist(['https://*.amazonaws.com/**', 'self']);
})

app.config(function($httpProvider){
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
{% endhighlight %}

As well, proper access-control headers are required on server responses for the cross-origin request to work.  In our [express.js](http://expressjs.com/) server, the following middleware handled the cross-origin requests.

{% highlight js %}
app = express();
app.configure(function() {
  //...
  app.use(function(req, res, next) {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("access-control-allow-headers", "content-type accept");
    res.setHeader("access-control-max-age", 10);
    return next();
  });
  //...
  app.use(app.router);
});
{% endhighlight %}

To note, the response headers must come before the router in the middleware stack.  


Technologies Used:

- [ionic html framework](http://ionicframework.com/)
- [angular js framework](http://angularjs.org/)
- [express js server](http://expressjs.com/)
- [cordova mobile API bridge ](https://cordova.apache.org/docs/en/3.3.0/)
