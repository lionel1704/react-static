'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ErrorWrapper', function () {
  var reactStaticEnviroment = void 0;

  beforeEach(function () {
    reactStaticEnviroment = process.env.REACT_STATIC_ENV;
  });

  describe('when process.env.REACT_STATIC_ENV is `development`', function () {
    it('should wrap the child with the ErrorCatcher', function () {
      process.env.REACT_STATIC_ENV = 'development';

      var errorWrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(
          'span',
          null,
          'hello'
        )
      ));

      expect(errorWrapper).toMatchSnapshot();
    });
  });

  describe('when process.env.REACT_STATIC_ENV is `production`', function () {
    it('should not wrap the child with the ErrorCatcher', function () {
      process.env.REACT_STATIC_ENV = 'production';

      var errorWrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(
          'span',
          null,
          'hello'
        )
      ));

      expect(errorWrapper).toMatchSnapshot();
    });

    describe('when showErrorsInProduction is defined', function () {
      it('should wrap the child with the ErrorCatcher', function () {
        process.env.REACT_STATIC_ENV = 'production';

        var errorWrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          _index2.default,
          { showErrorsInProduction: true },
          _react2.default.createElement(
            'span',
            null,
            'hello'
          )
        ));

        expect(errorWrapper).toMatchSnapshot();
      });
    });
  });

  afterEach(function () {
    process.env.REACT_STATIC_ENV = reactStaticEnviroment;
  });
});