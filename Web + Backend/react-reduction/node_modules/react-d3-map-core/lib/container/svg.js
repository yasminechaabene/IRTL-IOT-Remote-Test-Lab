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

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _commonProps = require('../commonProps');

var _commonProps2 = _interopRequireDefault(_commonProps);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var ChartSvg = (function (_Component) {
  _inherits(ChartSvg, _Component);

  function ChartSvg(props) {
    _classCallCheck(this, ChartSvg);

    _get(Object.getPrototypeOf(ChartSvg.prototype), 'constructor', this).call(this, props);
  }

  _createClass(ChartSvg, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var scaleExtent = _props.scaleExtent;
      var projection = _props.projection;
      var onZoom = _props.onZoom;
      var onZoomStart = _props.onZoomStart;
      var onZoomEnd = _props.onZoomEnd;
      var center = _props.center;

      var tau = 2 * Math.PI;

      // implement zoom if xscale and y scale is set!
      if (projection && onZoom) {
        var center = projection(center);

        var zoom = _d32['default'].behavior.zoom().scale(projection.scale() * tau).translate([width - center[0], height - center[1]]);

        if (scaleExtent) zoom.scaleExtent([scaleExtent[0] * tau, scaleExtent[1] * tau]);

        if (onZoom) zoom.on("zoom", function () {
          onZoom.call(_this, zoom.scale(), zoom.translate());
        });

        if (onZoomStart) zoom.on("zoomstart", function () {
          onZoomStart.call(_this, zoom.scale(), zoom.translate());
        });

        if (onZoomEnd) zoom.on("zoomend", function () {
          onZoomEnd.call(_this, zoom.scale(), zoom.translate());
        });

        _d32['default'].select(_reactDom2['default'].findDOMNode(this.refs.svgContainer)).call(zoom);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var height = _props2.height;
      var width = _props2.width;
      var svgClassName = _props2.svgClassName;
      var id = _props2.id;
      var children = _props2.children;

      return _react2['default'].createElement(
        'svg',
        {
          height: height,
          width: width,
          className: svgClassName,
          ref: 'svgContainer'
        },
        _react2['default'].createElement(
          'g',
          null,
          children
        )
      );
    }
  }], [{
    key: 'defaultProps',
    value: Object.assign(_commonProps2['default'], {
      svgClassName: 'react-d3-map-core__container_svg',
      scaleExtent: [1 << 12, 1 << 28]
    }),
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      id: _react.PropTypes.string,
      width: _react.PropTypes.number.isRequired,
      height: _react.PropTypes.number.isRequired,
      svgClassName: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return ChartSvg;
})(_react.Component);

exports['default'] = ChartSvg;
module.exports = exports['default'];