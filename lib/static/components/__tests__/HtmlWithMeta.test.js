'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _HtmlWithMeta = require('../HtmlWithMeta');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HtmlWithMeta', function () {
  test('when route is a static route', function () {
    var HtmlWithMeta = (0, _HtmlWithMeta.makeHtmlWithMeta)({
      head: { htmlProps: { lang: 'en' } }
    });

    var htmlWithMeta = (0, _enzyme.mount)(_react2.default.createElement(
      HtmlWithMeta,
      { className: 'body' },
      _react2.default.createElement(
        'head',
        null,
        _react2.default.createElement(
          'title',
          null,
          'React Static'
        )
      )
    ));

    expect(htmlWithMeta).toMatchSnapshot();
  });
});