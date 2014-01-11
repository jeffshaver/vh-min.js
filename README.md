vh-min.js
=========

JS that can be used to simulate vh unit functionality (since it isn't supported well on mobile)

When I was making something for my own site, there was a particular section that I wanted to be the full height of the viewport. There are vh and vw units that do exactly this. However, because of poor support (especially on mobile devices... iOS, Android, etc...) I needed a more effective way of doing this. Enter vh-min.js

Demo
====

http://jeffshaver.github.io/vh-min

Usage
=====

    <div id="element-that-needs-viewport-height" data-vhmin="true"></div>

The data-vhmin="true" attribute is what indicates this element should be at least a full viewport.

The only other option that is allowed is data-vhmin-offset. Adding this to your element will subtract pixels from the elements height

    <!-- Will remove 100 px from the viewport height -->
    <div id="element-that-needs-viewport-height" data-vhmin="true" data-vhmin-offset="100"></div>
    
    <!-- Will remove the height of the header element from the viewport height -->
    <div id="element-that-needs-viewport-height" data-vhmin="true" data-vhmin-offset="header"></div>
    
    <!-- Will not remove anything from the viewport height -->
    <div id="element-that-needs-viewport-height" data-vhmin="true"></div>

Once that is done, on load, call:

    vhmin.init();

Debouncing
==========

Debouncing is enabled by default as of 1.0.4. If no time is passed into the `vhmin.init` function, it is defaulted to 100ms.

If you want to disable debouncing altogether, pass in false.

Installation
============

You can use bower to install this.

    bower install vh-min
