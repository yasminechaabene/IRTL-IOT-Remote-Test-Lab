"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoPath = geoPath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

function geoPath(proj, props) {
  props = props || {};

  var _props = props;
  var pointRadius = _props.pointRadius;

  var geoPath = _d32["default"].geo.path();

  geoPath.projection(proj);

  if (pointRadius) geoPath.pointRadius(pointRadius);

  return geoPath;
}