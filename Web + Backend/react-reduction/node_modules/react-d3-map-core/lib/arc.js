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

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _utilsTooltipUpdate = require('./utils/tooltipUpdate');

var Arc = (function (_Component) {
  _inherits(Arc, _Component);

  function Arc(props) {
    _classCallCheck(this, Arc);

    _get(Object.getPrototypeOf(Arc.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Arc, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_mkArc',
    value: function _mkArc(dom) {
      var _props = this.props;
      var data = _props.data;
      var arcClass = _props.arcClass;
      var geoPath = _props.geoPath;
      var onMouseOut = _props.onMouseOut;
      var onMouseOver = _props.onMouseOver;

      var arc = _d32['default'].select(dom);

      // TODO: two points should transform to arc.

      arc.datum(data).attr('class', arcClass + ' arc').attr("d", geoPath).on("mouseover", function (d, i) {
        return onMouseOver(this, d, i);
      }).on("mouseout", function (d, i) {
        return onMouseOut(this, d, i);
      });

      return arc;
    }
  }, {
    key: 'render',
    value: function render() {
      var arcGroup = _reactFauxDom2['default'].createElement('path');
      var chart = this._mkArc(arcGroup);

      return chart.node().toReact();
    }
  }], [{
    key: 'defaultProps',
    value: {
      arcClass: 'react-d3-map-core__arc',
      onMouseOver: function onMouseOver(d) {},
      onMouseOut: function onMouseOut(d) {}
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
      geoPath: _react.PropTypes.func.isRequired,
      arcClass: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Arc;
})(_react.Component);

exports['default'] = Arc;
module.exports = exports['default'];