var vhmin = function() {
  var getElements = function() {
    Array.prototype.slice.call(document.querySelectorAll('[data-vhmin]')).forEach(function(item, index, array) {
      var vhminOffset = item.getAttribute('data-vhmin-offset'),
          offset;
      if (!isNaN(parseInt(vhminOffset, 10))) {
        offset = vhminOffset;
      } else if (!vhminOffset) {
        offset = 0;
      } else if (isNaN(parseInt(vhminOffset, 10))) {
        offset = document.querySelector(vhminOffset).offsetHeight;
      }
      this.elements.push({
        element: item,
        offset: offset
      });
    }, this);
  };
  
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
    init: function() {
      getElements.call(this);
      calculateHeight.call(this);
      window.addEventListener('resize', calculateHeight.bind(this), false);
    }
  }
}();