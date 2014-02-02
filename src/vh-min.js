/*
 * vh-min.js
 *
 * Copyright 2014 Jeffrey E. Shaver II
 * Released under the MIT license

 * https://github.com/jeffshaver/vh-min.js/blob/master/LICENSE
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.vhmin = factory();
  }
}(this, function(document, Array, Element) {
  return function() {
    var slice = Array.prototype.slice;
    var getElements = function() {
      slice.call(document.querySelectorAll('[data-vhmin]')).forEach(function(item) {
        var vhminOffset = item.getAttribute('data-vhmin-offset');
        var offset;
        if (!isNaN(parseInt(vhminOffset, 10))) {
          offset = parseInt(vhminOffset, 10);
        } else if (!vhminOffset) {
          offset = 0;
        } else if (isNaN(parseInt(vh, 10))) {
          offset = document.querySelector(vhminOffset).offsetHeight;
        }
        this.elements.push({
          element: item,
          offset: offset
        })
      });
    };
    var debounce = function(fn, delay) {
      var timer = null;
      var context = this;
      return function() {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(context), delay);
      }
    };
    var calculateHeight = function() {
      var windowHeight = window.innerHeight;
      this.elements.forEach(function(item) {
        var childrenHeight = 0;
        slice.call(item.element.children).forEach(function(item) {
          childrenHeight += item.offsetHeight;
        }, this);
        if (childrenHeight + item.offset < windowHeight) {
          item.element.style.height = (windowHeight - item.offset) + 'px';
        } else if (childrenHeight + item.offset > windowHeight && item.element.style.height != null) {
          item.element.style.height = null
        }
      }, this);
    }
    return  {
      elements: [],
      init: function(debounceDelay) {
        getElements.call(this);
        calculateHeight.call(this);
        if (debounceDelay !== false) {
          window.addEventListener('resize', debounce.call(this, calculateHeight, debounceDelay || 100), false);
        } else {
          window.addEventListener('resize', calculateHeight.bind(this), false);
        }
      }
    }
  };
}(document, Array, Element)));