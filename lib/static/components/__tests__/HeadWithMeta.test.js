'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _HeadWithMeta = require('../HeadWithMeta');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HeadWithMeta', function () {
  var data = void 0;
  beforeEach(function () {
    var inlineCSS = '\n      body {\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n    ';
    data = {
      head: {
        base: '',
        title: [_react2.default.createElement(
          'title',
          null,
          'Helmet Title'
        )],
        meta: '',
        link: '',
        noscript: '',
        script: '',
        style: ''
      },
      route: { redirect: false },
      embeddedRouteInfo: {
        routeDate: 'here'
      },
      clientScripts: ['main.js', 'bootstrap.js'],
      clientStyleSheets: ['main.css', 'bootstrap.css'],
      clientCss: _react2.default.createElement(
        'style',
        null,
        inlineCSS
      ),
      config: {
        publicPath: 'public/path',
        inlineCss: false
      }
    };
  });

  test('when route is a static route', function () {
    var HeadWithMeta = (0, _HeadWithMeta.makeHeadWithMeta)(data);

    var headWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      HeadWithMeta,
      { className: 'body' },
      _react2.default.createElement('meta', { name: 'description', content: 'Helmet application' })
    ));

    expect(headWithMeta).toMatchSnapshot();
  });

  test('when route is a redirect route', function () {
    data.route.redirect = true;
    var HeadWithMeta = (0, _HeadWithMeta.makeHeadWithMeta)(data);

    var headWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      HeadWithMeta,
      { className: 'body' },
      _react2.default.createElement('meta', { name: 'description', content: 'Helmet application' })
    ));

    expect(headWithMeta).toMatchSnapshot();
  });

  test('when route has inline CSS', function () {
    data.config.inlineCss = true;
    var HeadWithMeta = (0, _HeadWithMeta.makeHeadWithMeta)(data);

    var headWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      HeadWithMeta,
      { className: 'body' },
      _react2.default.createElement('meta', { name: 'description', content: 'Helmet application' })
    ));

    expect(headWithMeta).toMatchSnapshot();
  });

  test('when route has title as child', function () {
    var HeadWithMeta = (0, _HeadWithMeta.makeHeadWithMeta)(data);

    var headWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      HeadWithMeta,
      { className: 'body' },
      _react2.default.createElement(
        'title',
        null,
        'Document Title'
      ),
      _react2.default.createElement('meta', { name: 'description', content: 'Helmet application' })
    ));

    expect(headWithMeta).toMatchSnapshot();
  });

  test('when route has no helmet title', function () {
    var HeadWithMeta = (0, _HeadWithMeta.makeHeadWithMeta)(_extends({}, data, {
      head: _extends({}, data.head, {
        title: []
      })
    }));

    var headWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      HeadWithMeta,
      { className: 'body' },
      _react2.default.createElement(
        'title',
        null,
        'Document Title'
      ),
      _react2.default.createElement('meta', { name: 'description', content: 'Helmet application' })
    ));

    expect(headWithMeta).toMatchSnapshot();
  });
});