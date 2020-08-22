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

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _utilsTooltipUpdate = require('./utils/tooltipUpdate');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var Tile = (function (_Component) {
  _inherits(Tile, _Component);

  function Tile(props) {
    _classCallCheck(this, Tile);

    _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Tile, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var scale = _props.scale;
      var translate = _props.translate;
      var tiles = _props.tiles;
      var tileClass = _props.tileClass;
      var onLoad = _props.onLoad;

      var transform = "scale(" + scale + ")translate(" + translate + ")";
      var tilesGroup = tiles.map(function (t, i) {

        var id = 'react-d3-map-core__tiles__' + t.join('-');

        var c = t.slice();

        var minCol = 0;
        var maxCol = Math.pow(2, t[2]);

        while (c[0] < minCol) c[0] += maxCol;
        while (c[0] >= maxCol) c[0] -= maxCol;

        var z = c[2];
        var y = c[1];
        var x = c[0];
        var xlink;

        if (y >= maxCol || c[2] === 0 && y > 0 || y < minCol) {
          xlink = null;
        } else {
          xlink = "//a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png";
        }

        return _react2['default'].createElement('image', {
          className: tileClass + ' tile',
          key: t.join('-'),
          id: id,
          xlinkHref: xlink,
          width: 1,
          height: 1,
          x: t[0],
          y: t[1],
          onLoad: onLoad
        });
      });

      return _react2['default'].createElement(
        'g',
        {
          transform: transform
        },
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          { component: 'g', transitionName: 'tiles', transitionEnterTimeout: 100, transitionLeaveTimeout: 100 },
          tilesGroup
        )
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      tileClass: 'react-d3-map-core__tile'
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      tiles: _react.PropTypes.array.isRequired,
      tileClass: _react.PropTypes.string,
      scale: _react.PropTypes.number.isRequired,
      translate: _react.PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  return Tile;
})(_react.Component);

exports['default'] = Tile;
module.exports = exports['default'];