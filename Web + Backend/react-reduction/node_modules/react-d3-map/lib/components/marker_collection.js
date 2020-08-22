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

var _reactD3MapCore = require('react-d3-map-core');

var MarkerCollection = (function (_Component) {
  _inherits(MarkerCollection, _Component);

  function MarkerCollection() {
    _classCallCheck(this, MarkerCollection);

    _get(Object.getPrototypeOf(MarkerCollection.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MarkerCollection, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.showPopup.size !== this.props.showPopup.size) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var projection = _props.projection;
      var onClick = _props.onClick;
      var onMouseOver = _props.onMouseOver;
      var onMouseOut = _props.onMouseOut;
      var markerClass = _props.markerClass;

      var markers;
      var pointData;

      if (data.type === 'FeatureCollection') {
        pointData = [];

        // loop through features
        data.features.forEach(function (d) {
          pointData.push(d);
        });
      } else if (data.type === 'Feature') {

        pointData = data;
      }

      if (pointData) {
        // if not array, make it as array
        if (!Array.isArray(pointData)) pointData = [pointData];

        markers = pointData.map(function (d, i) {
          var x = +projection(d.geometry.coordinates)[0];
          var y = +projection(d.geometry.coordinates)[1];
          var id = x + '-' + y;
          return _react2['default'].createElement(_reactD3MapCore.Marker, {
            id: id,
            key: i,
            data: d,
            x: x,
            y: y,
            onClick: onClick,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut,
            markerClass: markerClass
          });
        });
      }

      return _react2['default'].createElement(
        'g',
        null,
        markers
      );
    }
  }]);

  return MarkerCollection;
})(_react.Component);

exports['default'] = MarkerCollection;
module.exports = exports['default'];