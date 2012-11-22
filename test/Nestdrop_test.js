/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('Global tests', {
    setup: function() {
      this.elems = $('body').children();
    }
  });

  /*
  asyncTest( "asynchronous result", 1, function() {
    var $promise = $("body").nestdrop();
    $promise.always( function() { 
      ok( true, "Returned promise has either been resolved or rejected" );
	});
  });
  */
  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.nestdrop(), this.elems, 'should be chainable');
  });

  /*
  asyncTest( "result is chainable", function() {
    expect( 1 );
 
    var $promise = $("body").nestdrop();
    $promise.then( function(n) { 
      strictEqual($("body"), n, 'should be chainable');
    });
    
  });
  */
  

}(jQuery));
