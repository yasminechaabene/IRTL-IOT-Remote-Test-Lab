"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.tileFunc = tileFunc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _libraryD3GeoTileJs = require('../library/d3.geo.tile.js');

var _libraryD3GeoTileJs2 = _interopRequireDefault(_libraryD3GeoTileJs);

function tileFunc(props) {
  var scale = props.scale;
  var translate = props.translate;
  var size = props.size;
  var zoomDelta = props.zoomDelta;

  var tileFunc;

  tileFunc = (0, _libraryD3GeoTileJs2['default'])();

  if (scale) tileFunc.scale(scale);
  if (translate) tileFunc.translate(translate);
  if (size) tileFunc.size(size);
  if (zoomDelta) tileFunc.zoomDelta(zoomDelta);

  return tileFunc();
}