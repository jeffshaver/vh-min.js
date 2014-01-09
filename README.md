vh-min.js
=========

JS that can be used to simulate vh unit functionality (since it isn't supported well on mobile)

When I was making something for my own site, there was a particular section that I wanted to be the full height of the viewport. There are vh and vw units that do exactly this. However, because of poor support (especially on mobile devices... iOS, Android, etc...) I needed a more effective way of doing this. Enter vh-min.js

Usage
=====

    <div id="element-that-needs-viewport-height" data-vhmin="true"></div>

The data-vhmin="true" attribute is what indicates this element should be at least a full viewport.

The only other option that is allowed is data-vhmin-offset="number". Adding this to your element will subtract pixels from the elements height

    // Will remove 100 px from the viewport height
    <div id="element-that-needs-viewport-height" data-vhmin="true" data-vhmin-offset="100"></div>

Once that is done, on load, call:

    vhmin.init();
