'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ErrorCatcher = require('../ErrorCatcher');

var _ErrorCatcher2 = _interopRequireDefault(_ErrorCatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ErrorCatcher', function () {
  test('by default should render children', function () {
    var errorCatcher = (0, _enzyme.shallow)(_react2.default.createElement(
      _ErrorCatcher2.default,
      null,
      _react2.default.createElement(
        'span',
        null,
        'hello'
      )
    ));

    expect(errorCatcher).toMatchSnapshot();
  });

  describe('when children throw an error', function () {
    it('should catch errors with componentDidCatch', function () {
      var ChildComponentWithError = function ChildComponentWithError() {
        throw new Error('Error thrown from problem child');
      };

      jest.spyOn(_ErrorCatcher2.default.prototype, 'componentDidCatch');

      var errorCatcher = (0, _enzyme.mount)(_react2.default.createElement(
        _ErrorCatcher2.default,
        null,
        _react2.default.createElement(ChildComponentWithError, null)
      ));

      expect(_ErrorCatcher2.default.prototype.componentDidCatch).toHaveBeenCalled();
      expect(errorCatcher.state('error')).toEqual(new Error('Error thrown from problem child'));
      expect(errorCatcher.state('errorInfo')).toMatchSnapshot();
      expect(errorCatcher).toMatchSnapshot();
    });
  });
});