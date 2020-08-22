"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isZoomUpdate = isZoomUpdate;

function isZoomUpdate(nextProps, nextState, that) {
  if (nextProps.zoomScale !== that.props.zoomScale || nextProps.zoomTranslate !== that.props.zoomTranslate) return true;else return false;
}