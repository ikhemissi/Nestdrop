/*
 * Nestdrop
 * https://github.com/ikhemissi/Nestdrop
 *
 * Copyright (c) 2012 Iheb KHEMISSI
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.nestdrop = function() {
    return this.each(function() {
      $(this).html('nestdrop');
    });
  };

  // Static method.
  $.nestdrop = function() {
    return 'nestdrop';
  };

  // Custom selector.
  $.expr[':'].nestdrop = function(elem) {
    return elem.textContent.indexOf('nestdrop') >= 0;
  };

}(jQuery));
