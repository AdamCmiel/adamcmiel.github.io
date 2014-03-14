---
layout: post
title: Writing Hello World in c++ using the GCC on the command line. 
description: ""
category: articles
tags: [c++, cpp, bash]
comments: true
share: true
---

# Coding in C++ on the command line in Mac OSX

Having breezed through several coding challenges on [codeeval](https://www.codeeval.com/public/c040b350003099438da28351b93d6f9750adb6e0/) in javascript I wanted to try my hand at coding in c++, which is surely (sub)conscious preparation for coding with OpenGL and Boost c++ libraries.

That said, I was surprised at how much trouble I had executing hello world in c++.  I'm sure it's because I've been spoilt by the node.js repl and the Chrome console.

First, check if you have gcc available:

{% highlight bash %}
gcc --help
{% endhighlight %}

If you get a lot of options and not an error message, skip the next step.
Otherwise, install the xcode command line tools, including the gcc, using:

{% highlight bash %}
xcode-select --install
{% endhighlight %}

The code for hello world in c++ is shown below.  Write this to a file called helloWorld.cpp

{% highlight cpp %}
#include <iostream>
using namespace std;

int main() 
{
  cout << "Hello World" << endl;
  return 0; 
}
{% endhighlight %}

On the command line, execute:

{% highlight bash %}
g++ helloWorld.cpp -o hello.out
{% endhighlight %}

To view the output, execute: 

{% highlight bash %}
./hello.out
{% endhighlight %}

which will print to stdout:
`Hello World`

Woo hoo!


Technologies Used:

- [GCC](http://gcc.gnu.org/)
- [c++](http://www.cplusplus.com/)
