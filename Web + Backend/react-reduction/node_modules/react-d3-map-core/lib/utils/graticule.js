"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graticule = graticule;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

function graticule(props) {

  var graticule = _d32["default"].geo.graticule();

  return graticule;
}