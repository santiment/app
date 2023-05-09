function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export const CHART_HEIGHT = 440;
export const BRUSH_HEIGHT = 40;
export const CHART_PADDING = {
  top: 10,
  right: 45,
  bottom: 23,
  left: 0
};
export const BRUSH_PADDING = {
  bottom: 23 + BRUSH_HEIGHT + 10
};
export const DOUBLE_AXIS_PADDING = {
  left: 45
};
export const buildPadding = (...modifiers) => _extends({}, CHART_PADDING, ...modifiers);