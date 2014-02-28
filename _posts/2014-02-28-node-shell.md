---
layout: post
title: Bash scripting with node.js
description: ""
category: articles
tags: [nodejs, bash, shell]
comments: true
share: true
---

# How to execute shell scripts within a node script

Trying to switch between production and testing databases for testing purposes (without using a tool like Grunt or Docker) I figured out how to execute shell commands within a node script.  The whole process is actually pretty easy.

First you require the node module 'child_process', then use the exec method on the returned object.

### Your Node.js script
{% highlight js %}
var child = require('child_process');

child.exec('echo "hello world" > log.txt', function(err, stout, sterr){
  if (err || sterr) {
    console.log('there was an error');
  } else {
    console.log('check the log.txt file');
  }
});
{% endhighlight %}

Without error, the script will produce the following in the newly created `log.txt` file created in the directory of the nodejs script.  Like with the globally accessible \_\_dirname variable in nodejs, the shell commands are run with the current path as the parent directory of the nodejs script.

Technologies Used:

- [Node.js](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
