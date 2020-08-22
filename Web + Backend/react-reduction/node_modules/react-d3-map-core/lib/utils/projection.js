"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projection = projection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

function projection(props) {
  var projection = props.projection;
  var pointRadius = props.pointRadius;

  var projFunc = _getProj(projection);

  var simplifyArea;
  var bounds;

  var proj = _mkProjectionSettings(props, projFunc);

  if (!props.simplify) return proj;

  var area = props.simplifyArea || 0;
  var simplify = _simplify(area);
  var round = _round();
  var projStream = proj.stream;

  // clip path with bounds
  if (props.clip && props.bounds) {
    var bound = props.bounds;
    var clip = _d32["default"].geo.clipExtent().extent(props.bounds);

    proj.stream = function (s) {
      return simplify.stream(projStream(round.stream(clip.stream(s))));
    };
  } else {
    proj.stream = function (s) {
      return simplify.stream(projStream(round.stream(s)));
    };
  }

  return proj;
}

function _getProj(projection) {
  /* albersUsa
   * azimuthalEquidistant
   * azimuthalEqualArea
   * conicEqulArea
   * conicConformal
   * conicEquidistant
   * equirectangularm
   * gnomonicm
   * orthographicm
   * stereographic
   * transverseMercator */

  if (_d32["default"].geo.hasOwnProperty(projection)) return _d32["default"].geo[projection]();else if (projection === null) return null;else new Error("Please check your projection setting. \"" + projection + "\" projection is invalid. ");
}

function _mkProjectionSettings(props, func) {
  var scale = props.scale;
  var translate = props.translate;
  var precision = props.precision;
  var rotate = props.rotate;
  var center = props.center;
  var clipAngle = props.clipAngle;
  var parallels = props.parallels;

  if (scale) func.scale(scale);
  if (translate) func.translate(translate);
  if (precision) func.precision(precision);
  if (rotate) func.rotate(rotate);
  if (center) func.center(center);
  if (clipAngle) func.clipAngle(clipAngle);
  if (parallels) func.parallels(parallels);

  return func;
}

function _round(area) {
  return _d32["default"].geo.transform({
    point: function point(x, y, z) {
      this.stream.point(Math.round(x), Math.round(y));
    },
    sphere: function sphere() {
      this.stream.sphere();
    }
  });
}

function _simplify(area) {
  return _d32["default"].geo.transform({
    point: function point(x, y, z) {
      if (!z) {
        this.stream.point(x, y);
      } else if (z >= area) {
        this.stream.point(x, y);
      }
    },
    sphere: function sphere() {
      this.stream.sphere();
    }
  });
}