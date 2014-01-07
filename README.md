tabshare
========

This is a port of blassey's simple tab-sharing front-end UX from a Firefox Mobile patch attached to
[bug 742832](https://bugzilla.mozilla.org/show_bug.cgi?id=742832) to an Firefox Desktop XPI.  It's a restartless
XPI based on [edile'es example restartless stuff](http://ed.agadak.net/2011/01/restartless-add-on-example-code).

The intent is to make it possible to experiment with various user experiences for tab-sharing.  

https://github.com/dmose/tabshare/blob/master/TabShare.xpi?raw=true is the XPI;
if you save it to disk and install it on a recent Firefox desktop nightly, the 
"share tab" in the permissions dropdown will offer the active tab as a source.
This is actually a fairly bizarre UX; but it's a first step.  It's slightly easier 
to see the potential if one uses it while playing around with http://talkilla.mozillalabs.com/

Note that the backend currently always only shares the top box of the document,
[bug 952625](https://bugzilla.mozilla.org/show_bug.cgi?id=952625) is now on file
to make it possible to share scrolling viewports as well.
