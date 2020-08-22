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

var _immutable = require('immutable');

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _reactD3MapCore = require('react-d3-map-core');

var _componentsMesh_collection = require('./components/mesh_collection');

var _componentsMesh_collection2 = _interopRequireDefault(_componentsMesh_collection);

var LineGroup = (function (_Component) {
  _inherits(LineGroup, _Component);

  function LineGroup(props) {
    _classCallCheck(this, LineGroup);

    _get(Object.getPrototypeOf(LineGroup.prototype), 'constructor', this).call(this, props);

    this.state = {
      showPopup: (0, _immutable.OrderedMap)()
    };
  }

  _createClass(LineGroup, [{
    key: '_onClick',
    value: function _onClick(dom, d, id) {
      var onClick = this.props.onClick;

      this.id = id;
      this.d = d;
      this.domRef = dom;

      if (onClick) onClick(this, d, id);
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(dom, d, id) {
      var onMouseOut = this.props.onMouseOut;

      this.id = id;
      this.d = d;
      this.domRef = dom;

      if (onMouseOut) onMouseOut(this, d, id);
    }
  }, {
    key: '_onMouseOver',
    value: function _onMouseOver(dom, d, id) {
      var onMouseOver = this.props.onMouseOver;

      this.id = id;
      this.d = d;
      this.domRef = dom;

      if (onMouseOver) onMouseOver(this, d, id);
    }
  }, {
    key: '_onCloseClick',
    value: function _onCloseClick(id) {
      var onCloseClick = this.props.onCloseClick;

      this.id = id;

      if (onCloseClick) onCloseClick(this, id);
    }
  }, {
    key: 'showPopup',
    value: function showPopup() {
      var showPopup = this.state.showPopup;
      var projection = this.context.projection;

      var id = this.id;
      var d = this.d;

      if (showPopup.keySeq().toArray().indexOf(id) !== -1) {
        // hide popup
        var newPopup = showPopup['delete'](id);
      } else {
        // add a popup
        var position = projection.invert([_d32['default'].event.clientX, _d32['default'].event.clientY]);

        var newPopup = showPopup.set(id, (0, _immutable.Map)({
          xPopup: position[0],
          yPopup: position[1],
          data: d
        }));
      }

      this.setState({
        showPopup: newPopup
      });
    }
  }, {
    key: 'hidePopup',
    value: function hidePopup() {
      var showPopup = this.state.showPopup;

      var id = this.id;

      if (showPopup.keySeq().toArray().indexOf(id) !== -1) {
        // hide popup
        var newPopup = showPopup['delete'](id);
      }

      this.setState({
        showPopup: newPopup
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var showPopup = this.state.showPopup;
      var _props = this.props;
      var data = _props.data;
      var popupContent = _props.popupContent;
      var meshClass = _props.meshClass;
      var _context = this.context;
      var geoPath = _context.geoPath;
      var projection = _context.projection;

      var onClick = this._onClick.bind(this);
      var onMouseOver = this._onMouseOver.bind(this);
      var onMouseOut = this._onMouseOut.bind(this);
      var popup;

      if (showPopup.size && popupContent) {
        popup = showPopup.keySeq().toArray().map(function (d, i) {
          var xPopup = showPopup.get(d).get('xPopup');
          var yPopup = showPopup.get(d).get('yPopup');
          var popupData = showPopup.get(d).get('data');

          var point = projection([xPopup, yPopup]);
          var content = popupContent(popupData);

          var onCloseClick = _this._onCloseClick.bind(_this, d);

          return _react2['default'].createElement(_reactD3MapCore.Popup, {
            key: i,
            x: point[0],
            y: point[1] - 10,
            contentPopup: content,
            closeClick: onCloseClick
          });
        });
      }

      return _react2['default'].createElement(
        'g',
        null,
        _react2['default'].createElement(_componentsMesh_collection2['default'], _extends({
          data: data,
          geoPath: geoPath,
          onClick: onClick,
          onMouseOver: onMouseOver,
          onMouseOut: onMouseOut,
          meshClass: meshClass
        }, this.state)),
        popup
      );
    }
  }], [{
    key: 'contextTypes',
    value: {
      geoPath: _react2['default'].PropTypes.func.isRequired,
      projection: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return LineGroup;
})(_react.Component);

exports['default'] = LineGroup;
module.exports = exports['default'];