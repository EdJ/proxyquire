/*jshint asi:true*/
/*global describe before beforeEach it */
'use strict';

var assert = require('assert'),
  realUndefinedDependency = require('./samples/undefinedDependency'),
  realBar = require('./samples/bar');


describe('undefined dependency', function() {
  var proxyquire = require('..');

  it('proxyquire can callThru and then load', function() {
    var proxiedUndefinedDependency = proxyquire.callThru().load('./samples/undefinedDependency', {
      './bar': null
    });

    assert.equal(typeof proxiedUndefinedDependency, 'object');
    assert.notStrictEqual(realUndefinedDependency, proxiedUndefinedDependency);
    assert.equal(proxiedUndefinedDependency.bar, realBar);
  });

  it('proxyquire can noCallThru and then load', function() {
    var proxiedUndefinedDependency = proxyquire.noCallThru().load('./samples/undefinedDependency', {
      './bar': null
    });

    assert.equal(typeof proxiedUndefinedDependency, 'object');
    assert.notStrictEqual(realUndefinedDependency, proxiedUndefinedDependency);

    assert.equal(proxiedUndefinedDependency.bar, null);
  });
})