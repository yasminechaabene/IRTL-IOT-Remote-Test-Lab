"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ZoomControl = (function (_Component) {
  _inherits(ZoomControl, _Component);

  function ZoomControl(props) {
    _classCallCheck(this, ZoomControl);

    _get(Object.getPrototypeOf(ZoomControl.prototype), 'constructor', this).call(this, props);
  }

  _createClass(ZoomControl, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var zoomInClick = _props.zoomInClick;
      var zoomOutClick = _props.zoomOutClick;
      var top = _props.top;
      var left = _props.left;

      var zoomControlStyle = {
        left: left,
        top: top,
        position: 'absolute',
        border: '2px solid rgba(0,0,0,0.2)',
        backgroundClip: 'padding-box',
        boxShadow: 'none',
        marginLeft: '10px',
        marginTop: '10px',
        cursor: 'pointer'
      };

      var zoomInStyle = {
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        fontSize: '22px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #CCC',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        display: 'block'
      };

      var zoomOutStyle = {
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        fontSize: '24px',
        backgroundColor: '#fff',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        display: 'block'
      };

      return _react2['default'].createElement(
        'div',
        { className: 'react-d3-map-core__zoom-control', style: zoomControlStyle },
        _react2['default'].createElement(
          'a',
          { className: 'react-d3-map-core__zoom-control__zoom-in', style: zoomInStyle, onClick: zoomInClick },
          '+'
        ),
        _react2['default'].createElement(
          'a',
          { className: 'react-d3-map-core__zoom-control__zoom-out', style: zoomOutStyle, onClick: zoomOutClick },
          '-'
        )
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      left: 0,
      top: 0,
      zoomInClick: function zoomInClick() {},
      zoomOutClick: function zoomOutClick() {}
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      left: _react.PropTypes.number.isRequired,
      top: _react.PropTypes.number.isRequired,
      zoomInClick: _react.PropTypes.func.isRequired,
      zoomOutClick: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return ZoomControl;
})(_react.Component);

exports['default'] = ZoomControl;
module.exports = exports['default'];