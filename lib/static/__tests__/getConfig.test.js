'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getConfig = require('../getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _defaultConfigDevelopment = require('../__mocks__/defaultConfigDevelopment.mock');

var _defaultConfigDevelopment2 = _interopRequireDefault(_defaultConfigDevelopment);

var _defaultConfigProduction = require('../__mocks__/defaultConfigProduction.mock');

var _defaultConfigProduction2 = _interopRequireDefault(_defaultConfigProduction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('path', function () {
  return {
    resolve: function resolve() {
      var stringOne = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var stringTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return '' + stringOne + stringTwo;
    },
    join: function join(stringOne, stringTwo) {
      return stringOne + '/' + stringTwo;
    },
    dirname: function dirname() {
      return 'root/';
    }
  };
});

jest.mock('../../utils/getDirname', function () {
  return function () {
    return './dirname/';
  };
});

var testConfiguration = function testConfiguration(configuration, configurationMock) {
  expect(configuration).toMatchObject(configurationMock);
  expect(configuration.getSiteData).toBeInstanceOf(Function);
  expect(configuration.renderToHtml).toBeInstanceOf(Function);
  expect(configuration.getRoutes).toBeInstanceOf(Function);
};

describe('cutPathToRoot', function () {
  it('should return a root of the path', function () {
    expect((0, _getConfig.cutPathToRoot)('./root/path/to/')).toBe('./root');
  });
});

describe('trimLeadingAndTrailingSlashes', function () {
  it('should return a String with the leading and trailing slash trimmed', function () {
    expect((0, _getConfig.trimLeadingAndTrailingSlashes)('/path/to/')).toBe('path/to');
  });
});

describe('createNormalizedRoute', function () {
  describe('when working route is provided', function () {
    it('should return a normalized route', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var route;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              route = (0, _getConfig.createNormalizedRoute)({ path: '/path/' });


              expect(route).toEqual({
                hasGetProps: false,
                noindex: undefined,
                originalPath: 'path',
                path: 'path'
              });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));

    describe('when noindex is true', function () {
      it('should return a normalized route with noindex as true', function () {
        var route = (0, _getConfig.createNormalizedRoute)({ path: '/path/', noindex: true });

        expect(route.noindex).toEqual(true);
      });
    });

    describe('when noIndex is true', function () {
      var spy = void 0;

      beforeEach(function () {
        spy = jest.spyOn(console, 'warn').mockImplementation(function () {});
      });

      it('should return a normalized route with noindex as true', function () {
        var route = (0, _getConfig.createNormalizedRoute)({ path: '/path/', noIndex: true });

        expect(route.noindex).toEqual(true);
      });

      it('should warns the user to use noIndex', function () {
        (0, _getConfig.createNormalizedRoute)({ path: '/path/', noIndex: true });

        expect(spy).toHaveBeenCalled();
        expect(spy).toBeCalledWith("=> Warning: Route /path/ is using 'noIndex'. Did you mean 'noindex'?");
      });

      afterEach(function () {
        spy.mockRestore();
      });
    });

    describe('when path is not defined', function () {
      it('should throw an error', function () {
        var route = { component: '/no/path/', noIndex: true };

        expect(function () {
          return (0, _getConfig.createNormalizedRoute)(route);
        }).toThrow('No path defined for route: ' + JSON.stringify(route));
      });

      describe('when route is 404', function () {
        it('should not throw an error', function () {
          expect(function () {
            return (0, _getConfig.createNormalizedRoute)({ component: '/no/path/', is404: true });
          }).not.toThrow();
        });
      });
    });

    describe('when parent route is provided', function () {
      it('should return a normalized route', function () {
        var route = (0, _getConfig.createNormalizedRoute)({ path: '/to/' }, { path: '/path/' });

        expect(route).toEqual({
          hasGetProps: false,
          noindex: undefined,
          originalPath: 'to',
          path: 'path/to'
        });
      });

      describe('when parent noindex is true', function () {
        it('should return a normalized route with noindex as true', function () {
          var route = (0, _getConfig.createNormalizedRoute)({ path: '/to/' }, { path: '/path/', noindex: true });

          expect(route.noindex).toEqual(true);
        });
      });
    });
  });
});

describe('makeGetRoutes', function () {
  describe('when getRoutes is defined on config', function () {
    it('should return routes', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var config, getRoutes, routes;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              config = { getRoutes: function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            return _context2.abrupt('return', [{ path: '/path' }]);

                          case 1:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, undefined);
                  }));

                  return function getRoutes() {
                    return _ref3.apply(this, arguments);
                  };
                }() };
              getRoutes = (0, _getConfig.makeGetRoutes)(config);
              _context3.next = 4;
              return getRoutes();

            case 4:
              routes = _context3.sent;


              expect(routes).toEqual([{
                hasGetProps: false,
                noindex: undefined,
                originalPath: 'path',
                path: 'path'
              }, {
                hasGetProps: false,
                is404: true,
                noindex: undefined,
                originalPath: '404',
                path: '404'
              }]);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('should return routes', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var config, getRoutes, routes;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              config = {
                getRoutes: function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.abrupt('return', [{ path: '/path' }, { is404: true, path: '404' }]);

                          case 1:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, undefined);
                  }));

                  return function getRoutes() {
                    return _ref5.apply(this, arguments);
                  };
                }()
              };
              getRoutes = (0, _getConfig.makeGetRoutes)(config);
              _context5.next = 4;
              return getRoutes();

            case 4:
              routes = _context5.sent;


              expect(routes).toEqual([{
                hasGetProps: false,
                noindex: undefined,
                originalPath: 'path',
                path: 'path'
              }, {
                hasGetProps: false,
                is404: true,
                noindex: undefined,
                originalPath: '404',
                path: '404'
              }]);

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    describe('when routes has children', function () {
      var routesWithChildren = [{
        path: '/path',
        children: [{
          path: 'to',
          children: [{
            path: 'blog'
          }, {
            path: 'slug'
          }]
        }]
      }];

      it('should return a flat Array of routes', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var config, getRoutes, routes;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                config = { getRoutes: function () {
                    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                      return _regenerator2.default.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              return _context6.abrupt('return', routesWithChildren);

                            case 1:
                            case 'end':
                              return _context6.stop();
                          }
                        }
                      }, _callee6, undefined);
                    }));

                    return function getRoutes() {
                      return _ref7.apply(this, arguments);
                    };
                  }() };
                getRoutes = (0, _getConfig.makeGetRoutes)(config);
                _context7.next = 4;
                return getRoutes();

              case 4:
                routes = _context7.sent;


                expect(routes).toMatchSnapshot();

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      })));

      describe('when config.tree is defined', function () {
        it('should return a flat Array of routes', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
          var config, getRoutes, routes;
          return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  config = {
                    getRoutes: function () {
                      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
                        return _regenerator2.default.wrap(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                return _context8.abrupt('return', routesWithChildren);

                              case 1:
                              case 'end':
                                return _context8.stop();
                            }
                          }
                        }, _callee8, undefined);
                      }));

                      return function getRoutes() {
                        return _ref9.apply(this, arguments);
                      };
                    }(),
                    tree: true
                  };
                  getRoutes = (0, _getConfig.makeGetRoutes)(config);
                  _context9.next = 4;
                  return getRoutes();

                case 4:
                  routes = _context9.sent;


                  expect(routes).toMatchSnapshot();

                case 6:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        })));
      });
    });
  });

  describe('when getRoutes is not defined on config', function () {
    it('should return default route', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
      var config, getRoutes, routes;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              config = {};
              getRoutes = (0, _getConfig.makeGetRoutes)(config);
              _context10.next = 4;
              return getRoutes();

            case 4:
              routes = _context10.sent;


              expect(routes).toEqual([{
                hasGetProps: false,
                noindex: undefined,
                originalPath: '/',
                path: '/'
              }, {
                hasGetProps: false,
                noindex: undefined,
                originalPath: '404',
                is404: true,
                path: '404'
              }]);

            case 6:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));
  });
});

describe('buildConfigation', function () {
  var reactStaticEnviroment = void 0;
  var reactStaticPrefetchRate = void 0;
  var reactStaticDisableRouteInfoWarning = void 0;
  var reactStaticDisableRoutePreFixing = void 0;
  var spyProcess = void 0;

  beforeEach(function () {
    reactStaticEnviroment = process.env.REACT_STATIC_ENV;
    reactStaticPrefetchRate = process.env.REACT_STATIC_PREFETCH_RATE;
    reactStaticDisableRouteInfoWarning = process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING;
    reactStaticDisableRoutePreFixing = process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING;
    spyProcess = jest.spyOn(process, 'cwd').mockImplementation(function () {
      return './root/';
    });
  });

  describe('default configuration', function () {
    test('when REACT_STATIC_ENV is development', function () {
      process.env.REACT_STATIC_ENV = 'development';

      var configuration = (0, _getConfig.buildConfigation)();

      testConfiguration(configuration, _defaultConfigDevelopment2.default);
    });

    it('when REACT_STATIC_ENV is production', function () {
      process.env.REACT_STATIC_ENV = 'production';

      var configuration = (0, _getConfig.buildConfigation)();

      testConfiguration(configuration, _defaultConfigProduction2.default);
    });
  });

  test('REACT_STATIC_PREFETCH_RATE is set by the prefetchRate (default)', function () {
    process.env.REACT_STATIC_PREFETCH_RATE = null;

    (0, _getConfig.buildConfigation)();

    expect(process.env.REACT_STATIC_PREFETCH_RATE).toBe('3');
  });

  test('REACT_STATIC_PREFETCH_RATE is set by the prefetchRate (from config)', function () {
    process.env.REACT_STATIC_PREFETCH_RATE = null;

    (0, _getConfig.buildConfigation)({ prefetchRate: 10 });

    expect(process.env.REACT_STATIC_PREFETCH_RATE).toBe('10');
  });

  test('REACT_STATIC_DISABLE_ROUTE_INFO_WARNING is set by the disableRouteInfoWarning (default)', function () {
    process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING = null;

    (0, _getConfig.buildConfigation)();

    expect(process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING).toBe('false');
  });

  test('REACT_STATIC_DISABLE_ROUTE_INFO_WARNING is set by the disableRouteInfoWarning (from config)', function () {
    process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING = null;

    (0, _getConfig.buildConfigation)({ disableRouteInfoWarning: true });

    expect(process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING).toBe('true');
  });

  test('REACT_STATIC_DISABLE_ROUTE_PREFIXING is set by the disableRouteInfoWarning (default)', function () {
    process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING = null;

    (0, _getConfig.buildConfigation)();

    expect(process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING).toBe('false');
  });

  test('REACT_STATIC_DISABLE_ROUTE_PREFIXING is set by the disableRouteInfoWarning (from config)', function () {
    process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING = null;

    (0, _getConfig.buildConfigation)({ disableRoutePrefixing: true });

    expect(process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING).toBe('true');
  });

  afterEach(function () {
    process.env.REACT_STATIC_ENV = reactStaticEnviroment;
    process.env.REACT_STATIC_PREFETCH_RATE = reactStaticPrefetchRate;
    process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING = reactStaticDisableRouteInfoWarning;
    process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING = reactStaticDisableRoutePreFixing;

    spyProcess.mockRestore();
  });
});

describe('getConfig', function () {
  var spyProcess = void 0;

  beforeEach(function () {
    spyProcess = jest.spyOn(process, 'cwd').mockImplementation(function () {
      return './root/';
    });
  });

  describe('when no path or configuration is not provided', function () {
    it('should return a configuration using default file', function () {
      // mapped by the moduleNameMapper in package.js -> src/static/__mocks__/static.config.js
      // default path is 'static.config.js'
      var configuration = (0, _getConfig2.default)();

      testConfiguration(configuration, _extends({}, _defaultConfigProduction2.default, {
        entry: 'path/to/entry/index.js'
      }));
    });
  });

  describe('when provided a path to configuration', function () {
    it('should return a configuration using file provided', function () {
      // mapped by the moduleNameMapper in package.js -> src/static/__mocks__/static.config.js
      var configuration = (0, _getConfig2.default)('./path/to/static.config.js');

      testConfiguration(configuration, _extends({}, _defaultConfigProduction2.default, {
        entry: 'path/to/entry/index.js'
      }));
    });
  });

  describe('when provided a configuration', function () {
    it('should return a merged configuration', function () {
      var configuration = (0, _getConfig2.default)({
        entry: 'another/path/to/entry/index.js'
      });

      testConfiguration(configuration, _extends({}, _defaultConfigProduction2.default, {
        entry: 'another/path/to/entry/index.js'
      }));
    });
  });

  afterEach(function () {
    spyProcess.mockRestore();
  });
});