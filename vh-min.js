var vhmin = (function () {
  'use strict';
  var getElements = function () {
    Array.prototype.slice.call(document.querySelectorAll('[data-vhmin]')).forEach(function (item) {
      var offset, vhminOffset = item.getAttribute('data-vhmin-offset');
      if (!isNaN(parseInt(vhminOffset, 10))) {
        offset = parseInt(vhminOffset, 10);
      } else {
        if (!vhminOffset) {
          offset = 0;
        } else {
          if (isNaN(parseInt(vhminOffset, 10))) {
            offset = document.querySelector(vhminOffset).offsetHeight;
          }
        }
      }
      this.elements.push({
        element: item,
        offset: offset
      });
    }, this);
  },
    debounce = function (fn, delay) {
      var timer = null,
        context = this;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(context), delay);
      };
    },
    calculateHeight = function () {
      var windowHeight = window.innerHeight;
      this.elements.forEach(function (item) {
        var childrenHeight = 0;
        Array.prototype.slice.call(item.element.children).forEach(function (item) {
          childrenHeight += item.offsetHeight;
        }, this);
        if (childrenHeight + item.offset < windowHeight) {
          item.element.style.height = (windowHeight - item.offset) + 'px';
        } else {
          if (childrenHeight + item.offset > windowHeight) {
            item.element.style.height = childrenHeight + 'px';
          }
        }
      }, this);
    };
  return {
    elements: [],
    init: function (debounceDelay) {
      getElements.call(this);
      calculateHeight.call(this);
      if (debounceDelay !== false) {
        window.addEventListener('resize', debounce.call(this, calculateHeight, debounceDelay || 100), false);
      } else {
        window.addEventListener('resize', calculateHeight.bind(this), false);
      }
    }
  };
}());
