---
layout: post
title: Transferring MySQL databases between machines
description: ""
category: articles
tags: [code, db, mysql]
comments: true
share: true
---

# Easy transfer of database between machines

### or, thank god it didn't break

I found myself needing to copy a database between machines and came across the following simple solution.  Now I just emailed the database because it was small enough, but tcp transfer might need to be used for larger data sets.

First to export the database to disk,
{% highlight bash %}
   $ mysqldump --quick db_name | gzip > db_name.gz -u priveleged_user
{% endhighlight %}

I had to include the `-u priveleged_user` on my machine due to an error that was thrown without.
Then to retrive the database on the recipient machine, 
{% highlight bash %}
   $ mysqladmin create db_name
   $ gunzip < db_name.gz | mysql db_name -u priveleged_user
{% endhighlight %}

To learn more about transferring databases, checkout [the mysql site.](https://dev.mysql.com/doc/refman/5.0/en/copying-databases.html)