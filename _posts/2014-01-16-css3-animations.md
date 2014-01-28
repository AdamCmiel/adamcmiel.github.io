---
layout: post
title: An easy way to implement cool animations with CSS3
description: "Somehow my classwork devolved from a dancefloor app using simple jQuery to move DOM nodes around on the page to a Jigglypuff blender."
category: articles
tags: [code, css, html, animations]
comments: true
share: true
---

Somehow my classwork devolved from a dancefloor app using simple jQuery to move DOM nodes around on the page to a [Jigglypuff Blender](https://jigglypuffblender.herokuapp.com/).  

The styling here is nothing too crazy, although it did take a few minutes to get all of the right divs and spans lined up just right.  

Here's where the magic happens: 
##### In the markup:
{% highlight html %}
    <div class="blenderImage"></div>
    <div class="blender"></div>
{% endhighlight %}

We append each of the 'dancers', in our case, Jigglypuff and NyanCat, to the div.blender.  That way their relative (actually `position: absolute`) positioning to the div.blender will rotate with the div, and they will appear to spin in the blender.  
##### In the styles:
{% highlight css %}
    @-webkit-keyframes rotate {
      from { -webkit-transform: rotate(0deg);    }
      to   { -webkit-transform: rotate(7200deg); }
    }
    @-webkit-keyframes blend{
      from { -webkit-transform: scale(1,1)        rotate(0deg);   }
      to   { -webkit-transform: scale(0.05, 0.05) rotate(3600deg);}
    }
    .blending{
      -webkit-animation: rotate 10s 4000 ease-in-out;
      animation:         rotate 10s 4000 ease-in-out;
    }
    .shrinking{
      -webkit-animation: blend 10s 4000 ease-in-out;
      animation:         blend 10s 4000 ease-in-out;
    }
{% endhighlight %}

When the _Will It Blend?_ button is pushed, the class .blending is added to the div.blenderImage and the .shrinking class is added to the div.blender.  This causes the background image, the spinning blades to rotate faster than the items on the page, suggestive of shear forces and inherent viscosity in the Jigglypuff mixture.  

The `@-webkit-keyframe` and `@keyframe` are CSS "functions" to use with the animation property, allowing you to specify the beginning and ending state of the animation.  Check out the CSS examples at [W3](http://www.w3schools.com/css/css3_animations.asp) to learn more.  

Notice all the -webkit browser prefixes.  For whatever reason Chrome doesn't support the native css properties yet, like *Safari, Mozilla, Opera, even Microsoft*