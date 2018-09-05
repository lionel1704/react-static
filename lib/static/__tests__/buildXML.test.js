'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _buildXML = require('../buildXML');

var _buildXML2 = _interopRequireDefault(_buildXML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

describe('getPermaLink', function () {
  it('should return a permalink', function () {
    var permalink = (0, _buildXML.getPermaLink)({
      path: '/path/to/somewhere',
      prefixPath: '/blog/'
    });

    expect(permalink).toEqual('/blog/path/to/somewhere/');
  });
});

describe('makeGenerateRouteXML', function () {
  it('should return the XML for route', function () {
    var generateRouteXML = (0, _buildXML.makeGenerateRouteXML)({ prefixPath: '/blog/' });
    var route = { path: '/path/to/somewhere' };
    var routeXML = generateRouteXML(route);

    expect(routeXML).toEqual('<url><loc>/blog/path/to/somewhere/</loc><priority>0.5</priority></url>');
  });

  describe('when custom properties are defined', function () {
    it('should return the XML for route', function () {
      var generateRouteXML = (0, _buildXML.makeGenerateRouteXML)({ prefixPath: '/blog/' });
      var route = {
        path: '/path/to/somewhere',
        lastModified: '10/10/2010',
        priority: 0.2
      };

      var routeXML = generateRouteXML(route);

      expect(routeXML).toMatchSnapshot();
    });
  });
});

describe('generateXML', function () {
  it('should return the XML for route', function () {
    var xml = (0, _buildXML.generateXML)({
      routes: [{ path: '/path/to/somewhere' }],
      prefixPath: '/blog/'
    });

    expect(xml).toMatchSnapshot();
  });

  describe('when noindex defined and route is 404', function () {
    it('should return a the XML with `/best-lib/` route ', function () {
      var xml = (0, _buildXML.generateXML)({
        routes: [{ path: '/path/to/article/' }, { path: '/path/to/somewhere/', noindex: true }, { path: '404', is404: true }],
        prefixPath: '/blog/'
      });

      expect(xml).toMatchSnapshot();
    });
  });
});

describe('getSiteRoot', function () {
  var oldProcessEnv = [].concat(_toConsumableArray(process.env));

  afterEach(function () {
    process.env = [].concat(_toConsumableArray(oldProcessEnv));
  });

  describe('when enviroment is staging', function () {
    it('should return the siteRoot', function () {
      process.env = { REACT_STATIC_STAGING: undefined };
      var config = {
        siteRoot: 'www.example.com',
        stagingSiteRoot: 'www.staging.example.com'
      };

      var siteRoot = (0, _buildXML.getSiteRoot)(config);

      expect(siteRoot).toEqual('www.example.com');
    });
  });

  describe('when enviroment is staging', function () {
    it('should return the stagingSiteRoot for siteRoot', function () {
      process.env.REACT_STATIC_STAGING = 'true';

      var config = {
        siteRoot: 'www.example.com',
        stagingSiteRoot: 'www.staging.example.com'
      };

      var siteRoot = (0, _buildXML.getSiteRoot)(config);

      expect(siteRoot).toEqual('www.staging.example.com');
    });
  });
});

describe('when custom properties are defined', function () {
  var oldProcessEnv = [].concat(_toConsumableArray(process.env));

  afterEach(function () {
    process.env = [].concat(_toConsumableArray(oldProcessEnv));
  });

  beforeEach(function () {
    process.env = { REACT_STATIC_STAGING: undefined };
  });

  describe('when siteRoot is not defined', function () {
    it('should not write a sitemap', function () {
      var spy = jest.spyOn(_fsExtra2.default, 'writeFile').mockImplementation(function () {});

      (0, _buildXML2.default)({ config: {} });

      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('should return the XML site', function () {
    var fn = jest.fn();
    var spy = jest.spyOn(_fsExtra2.default, 'writeFile').mockImplementation(fn);

    var config = {
      siteRoot: 'www.example.com/',
      disableRoutePrefixing: true,
      routes: [{
        path: '/path/to/somewhere',
        lastModified: '10/10/2010',
        priority: 0.2
      }],
      paths: {
        DIST: 'path/to/dist'
      }
    };

    (0, _buildXML2.default)({ config: config });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]).toBe('path/to/dist/sitemap.xml');
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    spy.mockRestore();
  });
});