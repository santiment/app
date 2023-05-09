import React from 'react';
import { getFontSize, getWordLength } from './utils';
import { renderPercent } from '../../../../components/PercentChanges';

const CustomizedTreeMapContent = props => {
  const {
    x,
    y,
    width,
    height,
    index,
    dataKey,
    root: {
      children
    }
  } = props;

  if (!children) {
    return null;
  }

  const item = children[index];
  const {
    ticker = '',
    color
  } = item;
  const value = renderPercent(100 * item[dataKey]);
  const fontSize = getFontSize(index, children.length);
  const tickerLength = getWordLength(fontSize, ticker);
  const showTicker = tickerLength + 8 < width;
  const valueLength = getWordLength(fontSize, value);
  const showChange = showTicker && valueLength + 6 < width && fontSize * 2 + 5 < height;
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: x,
    y: y,
    width: width,
    height: height,
    style: {
      fill: color,
      stroke: 'var(--white)',
      strokeWidth: 2
    }
  }), showTicker && /*#__PURE__*/React.createElement("text", {
    x: x + width / 2,
    y: y + height / 2 - (showChange ? 2 : -4),
    textAnchor: "middle",
    fill: "var(--rhino)",
    fontSize: fontSize,
    fontWeight: 500
  }, ticker), showChange && /*#__PURE__*/React.createElement("text", {
    x: x + width / 2,
    y: y + height / 2 + fontSize - 1,
    textAnchor: "middle",
    fill: "var(--rhino)",
    fontSize: fontSize,
    fontWeight: 500
  }, value));
};

export default CustomizedTreeMapContent;