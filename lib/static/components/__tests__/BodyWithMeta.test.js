'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _BodyWithMeta = require('../BodyWithMeta');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('BodyWithMeta', function () {
  test('when route is a static route', function () {
    var BodyWithMeta = (0, _BodyWithMeta.makeBodyWithMeta)({
      head: { bodyProps: { lang: 'en' } },
      route: { redirect: false },
      embeddedRouteInfo: {
        routeDate: 'here'
      },
      clientScripts: ['main.js', 'bootstrap.js'],
      ClientCssHash: function ClientCssHash() {
        return _react2.default.createElement(
          'style',
          null,
          'body{ width:100%; height: 100%; }'
        );
      },
      config: {
        publicPath: 'public/path'
      }
    });

    var bodyWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      BodyWithMeta,
      { className: 'body' },
      _react2.default.createElement(
        'div',
        null,
        'static page'
      )
    ));

    expect(bodyWithMeta).toMatchSnapshot();
  });

  test('when route is a redirect route', function () {
    var BodyWithMeta = (0, _BodyWithMeta.makeBodyWithMeta)({
      head: { bodyProps: { lang: 'en' } },
      route: { redirect: true },
      embeddedRouteInfo: {
        routeDate: 'here'
      },
      clientScripts: [_react2.default.createElement('script', { src: 'main.js' }), _react2.default.createElement('script', { src: 'bootstrap.js' })],
      ClientCssHash: function ClientCssHash() {
        return _react2.default.createElement(
          'style',
          null,
          'body{ width:100%; height: 100%; }'
        );
      },
      config: {}
    });

    var bodyWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      BodyWithMeta,
      { className: 'body' },
      _react2.default.createElement(
        'div',
        null,
        'static page'
      )
    ));

    expect(bodyWithMeta).toMatchSnapshot();
  });
});