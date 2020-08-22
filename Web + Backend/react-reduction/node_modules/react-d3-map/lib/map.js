"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactD3MapCore = require('react-d3-map-core');

var _commonProps = require('./commonProps');

var _commonProps2 = _interopRequireDefault(_commonProps);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

var Map = (function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);

    var scale = this.props.scale;

    this.state = {
      zoomTranslate: null,
      scaleSet: scale
    };
  }

  _createClass(Map, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        geoPath: this.geoPath,
        projection: this.projection
      };
    }
  }, {
    key: 'onZoom',
    value: function onZoom(onZoomScale, onZoomTranslate) {
      this.setState({
        scaleSet: onZoomScale,
        zoomTranslate: onZoomTranslate
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var scaleSet = _state.scaleSet;
      var zoomTranslate = _state.zoomTranslate;
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var center = _props.center;
      var projection = _props.projection;
      var simplify = _props.simplify;
      var simplifyArea = _props.simplifyArea;
      var clip = _props.clip;
      var bounds = _props.bounds;
      var data = _props.data;
      var popupContent = _props.popupContent;
      var scale = _props.scale;

      var zoomScale = this.props.zoomScale || scale;
      var times = zoomScale / scale;

      var onZoom = this.onZoom.bind(this);

      var translate = [width / 2, height / 2] || this.props.translate;

      var proj = (0, _reactD3MapCore.projection)({
        projection: projection,
        scale: scaleSet * times / 2 / Math.PI,
        translate: zoomTranslate || translate,
        center: center,
        simplify: simplify,
        simplifyArea: simplifyArea,
        clip: clip,
        bounds: bounds
      });

      var geo = (0, _reactD3MapCore.geoPath)(proj);

      this.projection = proj;
      this.geoPath = geo;

      var tiles = (0, _reactD3MapCore.tileFunc)({
        scale: proj.scale() * 2 * Math.PI,
        translate: proj([0, 0]),
        size: [width, height]
      });

      return _react2['default'].createElement(
        _reactD3MapCore.Chart,
        _extends({}, this.props, {
          width: width,
          height: height,
          projection: proj,
          onZoom: onZoom,
          center: center
        }),
        _react2['default'].createElement(
          _vector2['default'],
          _extends({}, this.props, this.state, {
            tiles: tiles,
            data: data
          }),
          this.props.children
        )
      );
    }
  }], [{
    key: 'defaultProps',
    value: _commonProps2['default'],
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      geoPath: _react2['default'].PropTypes.func.isRequired,
      projection: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Map;
})(_react.Component);

exports['default'] = Map;
module.exports = exports['default'];