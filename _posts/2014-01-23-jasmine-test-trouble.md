---
layout: post
title: Unexpected behavior with Jasmine spyOn
description: "Insight into backbone model instantiation and jasmine testing spoyon."
category: articles
tags: [code, testing, backbone, jasmine, js]
comments: true
share: true
---


While testing our new [Backbone.js](http://backbonejs.org) app, my pair and I ran into the following problem.  We had a spyOn object spying on the `render` method of one of our app's Views.  In this particular case we wanted to test that the `render` method was being called when an object was triggering a `'play'` event.  On visual inspection the desired behavior had been implemnted but the test failed.  

###The original test:

{% highlight js %}
    it('should call the render method on the play event', function(){
        view = new LibraryView({collection: fakeSongs});
        libraryRenderSpy = spyOn(LibraryView.prototype, 'render').andCallThrough();
        fakeSongs.models[0].play();
        expect(libraryRenderSpy).toHaveBeenCalled();
    });
    //test fails
{% endhighlight %}

This seems innocuous enough, however, when running the test, the libraryRenderSpy has not been called.  However, when firing the `'play'` event manually, the LibraryView is rendered again.  A refactor of the test, switching the first two lines and reimplementing the test condition produces the correct test result, and the test passes.

###The test passes:

{% highlight js %}
    it('should call the render method on the play event', function(){
        libraryRenderSpy = spyOn(LibraryView.prototype, 'render').andCallThrough();
        view = new LibraryView({collection: fakeSongs});
        fakeSongs.models[0].play();
        expect(libraryRenderSpy.callCount).toEqual(2);
    });
    //test passes
{% endhighlight %}

The disparity probably lies in the fact that the view is instanciated after the spyOn is created, and therefore the spyOn is attached to this particular instance of the LibraryView, where it had not been attached before.  Be careful __when__ you instanciate your Models and Views in Backbone, because tricky behaviour can be discovered in the timing of your executions.

###More Jasmine spyOn reference can be found here: 

- [Jasmine spyOn Cheat Sheet](http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/)
- [Jasmine documentation](http://pivotal.github.io/jasmine/)