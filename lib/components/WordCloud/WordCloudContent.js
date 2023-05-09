function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import TagCloud from 'react-tag-cloud';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/formatting';
import styles from './WordCloud.module.css';
const BIG_LIMIT = 3;
const MEDIUM_LIMIT = 9;
const WORD_BIG = {
  color: 'var(--dodger-blue)',
  fontSize: 18,
  fontWeight: 600
};
const WORD_MEDIUM = {
  color: 'var(--rhino)',
  fontSize: 16
};
const WORD_SMALL = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--casper)'
};

const getWordStyles = (index, bigLimit, mediumLimit, fixedFont) => {
  if (index < bigLimit) {
    if (fixedFont) return _objectSpread({
      color: WORD_BIG.color
    }, fixedFont);
    return WORD_BIG;
  }

  if (index < mediumLimit) {
    if (fixedFont) return _objectSpread({
      color: WORD_MEDIUM.color
    }, fixedFont);
    return WORD_MEDIUM;
  }

  if (fixedFont) return _objectSpread({
    color: WORD_SMALL.color
  }, fixedFont);
  return WORD_SMALL;
};

const WordCloudContent = /*#__PURE__*/React.memo(({
  cloud,
  showBadge = true,
  bigLimit = BIG_LIMIT,
  mediumLimit = MEDIUM_LIMIT,
  padding = 15,
  fixedFont,
  textClassName
}) => {
  return /*#__PURE__*/React.createElement(TagCloud, {
    style: {
      width: '100%',
      height: '100%',
      padding: padding,
      marginTop: 0
    }
  }, cloud.map(({
    word,
    score
  }, index) => /*#__PURE__*/React.createElement(Link, {
    key: word,
    to: `/labs/trends/explore/${word}`,
    style: getWordStyles(index, bigLimit, mediumLimit, fixedFont),
    className: cx(styles.text, textClassName)
  }, word, showBadge && index < bigLimit && /*#__PURE__*/React.createElement("div", {
    className: styles.score
  }, formatNumber(score, {
    maximumFractionDigits: 2
  })))));
});
export default WordCloudContent;