function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const LineNode = {
  LINE: 'line',
  FILLED_LINE: 'filledLine',
  GRADIENT_LINE: 'gradientLine',
  AREA: 'area'
};
const BarNode = {
  BAR: 'bar',
  AUTO_WIDTH_BAR: 'autoWidthBar',
  GREEN_RED_BAR: 'greenRedBar'
};
export const Node = _extends({
  CANDLES: 'candle'
}, LineNode, BarNode);
export const LINES = new Set(Object.values(LineNode));
export const BARS = new Set(Object.values(BarNode));