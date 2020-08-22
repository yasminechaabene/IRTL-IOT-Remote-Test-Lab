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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _utilsTooltipUpdate = require('./utils/tooltipUpdate');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var VectorTile = (function (_Component) {
  _inherits(VectorTile, _Component);

  function VectorTile(props) {
    _classCallCheck(this, VectorTile);

    _get(Object.getPrototypeOf(VectorTile.prototype), 'constructor', this).call(this, props);
  }

  _createClass(VectorTile, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var tilesGroup = _reactDom2['default'].findDOMNode(this.refs.vectorTilesGroup);
      this._mkVectorTile(tilesGroup);
    }

    // componentDidUpdate() {
    //   var tilesGroup = ReactDOM.findDOMNode(this.refs.vectorTilesGroup)
    //   this._mkVectorTile(tilesGroup);
    // }

  }, {
    key: '_mkVectorTile',
    value: function _mkVectorTile(dom) {
      var _this = this;

      var _props = this.props;
      var vectorTiles = _props.vectorTiles;
      var vectorTileClass = _props.vectorTileClass;
      var onMouseOut = _props.onMouseOut;
      var onMouseOver = _props.onMouseOver;
      var layers = _props.layers;
      var geoPath = _props.geoPath;

      var vectorTileDom = d3.select(dom);

      (0, _queueAsync2['default'])().defer(d3.json, "http://vector.mapzen.com/osm/" + layers + "/" + vectorTiles[2] + "/" + vectorTiles[0] + "/" + vectorTiles[1] + ".json?api_key=vector-tiles-_dA3ANY").await(function (error, json) {
        if (json.features) {
          var path = vectorTileDom.selectAll("path").data(json.features).enter().append("path").attr("key", function (d, i) {
            return i;
          }).attr("class", function (d) {
            return d.properties.kind;
          }).attr("d", geoPath);

          if (onMouseOut) path.on("mouseover", function (d, i) {
            return onMouseOver(_this, d, i);
          });

          if (onMouseOver) path.on("mouseout", function (d, i) {
            return onMouseOut(_this, d, i);
          });
        } else {
          for (var key in json) {
            var path = vectorTileDom.selectAll("path").data(json[key].features).enter().append("path").attr("key", function (d, i) {
              return i;
            }).attr("class", function (d) {
              return d.properties.kind;
            }).attr("d", geoPath);

            if (onMouseOut) path.on("mouseover", function (d, i) {
              return onMouseOver(_this, d, i);
            });

            if (onMouseOver) path.on("mouseout", function (d, i) {
              return onMouseOut(_this, d, i);
            });
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('g', {
        ref: 'vectorTilesGroup',
        className: 'tile'
      });
    }
  }], [{
    key: 'defaultProps',
    value: {
      vectorTileClass: 'react-d3-map-core__vectorTile',
      layers: 'all'
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      vectorTiles: _react.PropTypes.array.isRequired,
      vectorTileClass: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return VectorTile;
})(_react.Component);

exports['default'] = VectorTile;
module.exports = exports['default'];