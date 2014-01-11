var vhmin = function() {
  var getElements = function() {
    Array.prototype.slice.call(document.querySelectorAll('[data-vhmin]')).forEach(function(item, index, array) {
      this.elements.push({
        element: item,
        offset: parseInt(item.getAttribute('data-vhmin-offset'), 10) || 0
      });
    }, this);
  };
  
  var debounce = function(fn, delay) {
    var timer = null,
          context = this;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(fn.bind(context), delay);
    }
  }
  
  var calculateHeight = function() {
    var windowHeight = window.innerHeight;
    this.elements.forEach(function(item, index, array) {
      var childrenHeight = 0;
      Array.prototype.slice.call(item.element.children).forEach(function(item, index, array) {
        childrenHeight += item.offsetHeight;
      }, this);
      if (childrenHeight + item.offset < windowHeight) {
        item.element.style.height = (windowHeight - item.offset) + 'px';
      } else if (childrenHeight + item.offset > windowHeight) {
        item.element.style.height = childrenHeight + 'px'
      }
    }, this);
  }
  return {
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
}();
