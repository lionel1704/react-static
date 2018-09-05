'use strict';

var _shared = require('../shared');

describe('utils/shared', function () {
  describe('pathJoin()', function () {
    it('should strip slashes', function () {
      expect((0, _shared.pathJoin)('/foo/bar/')).toEqual('foo/bar');
    });
    it('should join paths and trim slashes', function () {
      expect((0, _shared.pathJoin)('foo', 'bar')).toEqual('foo/bar');
    });
    it('should return / for no path', function () {
      expect((0, _shared.pathJoin)()).toEqual('/');
    });
    it('should return / for no path', function () {
      expect((0, _shared.pathJoin)('')).toEqual('/');
    });
    it('should return / for /', function () {
      expect((0, _shared.pathJoin)('')).toEqual('/');
    });
  });
  describe('cleanPath()', function () {
    var basePath = process.env.REACT_STATIC_BASEPATH;
    beforeEach(function () {
      process.env.REACT_STATIC_BASEPATH = 'base/path';
    });

    it('should return / for falsey path', function () {
      expect((0, _shared.cleanPath)('')).toEqual('/');
    });

    it('should return / for /', function () {
      expect((0, _shared.cleanPath)('/')).toEqual('/');
    });

    it('should strip basePath', function () {
      expect((0, _shared.cleanPath)('base/path/foo/bar')).toEqual('foo/bar');
    });

    it('should trim slashes', function () {
      expect((0, _shared.cleanPath)('/foo/bar/')).toEqual('foo/bar');
    });

    afterEach(function () {
      process.env.REACT_STATIC_BASEPATH = basePath;
    });
  });
});