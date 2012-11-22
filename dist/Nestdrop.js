/*! jQuery Nestdrop - v0.0.1 - 2012-11-22
* https://github.com/ikhemissi/Nestdrop
* Copyright (c) 2012 Iheb KHEMISSI; Licensed MIT */

/*
 * Usage : $('body').nestdrop({nest: 'localhost:8080/tickets'});
 */
 
;(function ( $, window, undefined ) {

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variables rather than globals
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = 'nestdrop',
      document = window.document,
      defaults = {
        nest: "",   // Ticket server address
        auto: false // catch page errors using window.onerror (https://developer.mozilla.org/en-US/docs/DOM/window.onerror) and send them automatically to the ticket server
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    // jQuery has an extend method which merges the contents of two or 
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }
  
  // The ticket object constructor
  function Ticket( data ) {
    this.data = {
        date : new Date(),
        description : "",
        importance: 0,
        screenshot : null,
        url : window.location.href, // TODO : needs to be escaped ?
        browser : getBrowserInfo()
    };
    this.data = $.extend( this.data, data) ; // TODO : do we need to merge data here ? and do we have to use "this.data" here ?
  }
  
    // New ticket creation
    function createTicket(){
        var defer = $.Deferred(), // Asynchronous : we return a promise and when everything is ok then we return the actual ticket
        // Ticket creation date
        ticket = new Ticket(),
        // Browser
        browser = "Unknown browser",
        // Screenshot of the current webpage
        screenshot = null,
        ticketscreen; // TODO : using a template engine to map js object properties to dom
        
        // test if canvas is readable
        try {
            html2canvas( [ document.body ], {
                onrendered: function( canvas ) {
                    /* canvas is the actual canvas element, 
                       to append it to the page call for example 
                       document.body.appendChild( canvas );
                    */
                    //$('body').html2canvas();
                    //var queue = html2canvas.Parse();
                    //var canvas = html2canvas.Renderer(queue,{elements:{length:1}});
                    ticket.screenshot = canvas.toDataURL();
                    defer.resolve(ticket);
                 }
            });
            
            
        } catch(e) {
            //console.log("[Nestdrop] Screenshot : problem while getting data from canvas "+e); // TODO : check if console.log is available
            defer.resolve(ticket);
        }
        
        // TODO : Using a Promise/Deferred or an other kind of asynchronous reponse
        // return new ndTicket(date, browser, screenshot);
        return defer.promise();
    }

    // TODO : Return better browser description
  function getBrowserInfo(){
    return navigator.appName + " " + navigator.appVersion;
  }

  Plugin.prototype.init = function () {
    // Place initialization logic here
    // You already have access to the DOM element and the options via the instance, 
    // e.g., this.element and this.options
  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  };

}(jQuery, window));
