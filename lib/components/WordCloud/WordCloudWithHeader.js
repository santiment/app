const _excluded = ["word", "className", "showDescription", "classes", "isDesktop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import HelpPopup from './../../components/HelpPopup/HelpPopup';
import WidgetTrend from '../Widget/WidgetTrend';
import { SOCIAL_CONTEXT_DESCRIPTION } from '../../ducks/dataHub/metrics/descriptions';
import WordCloudContent from './WordCloudContent';
import { useWordCloud } from './hooks';
import styles from './WordCloud.module.css';
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.css';
export const WordCloudWithHeader = _ref => {
  let {
    word,
    className = '',
    showDescription = true,
    classes,
    isDesktop = true
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    from,
    to,
    size
  } = rest;
  const {
    cloud,
    loading,
    error
  } = useWordCloud({
    size,
    from,
    to,
    word
  });
  return /*#__PURE__*/React.createElement(WidgetTrend, _extends({
    className: className,
    trendWord: word,
    description: isDesktop && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: styles.heading
    }, "Social context"), /*#__PURE__*/React.createElement(HelpPopup, null, /*#__PURE__*/React.createElement("h4", {
      className: stylesTooltip.title
    }, "Social context"), SOCIAL_CONTEXT_DESCRIPTION)),
    isLoading: loading,
    error: error,
    hasData: cloud.length > 0
  }, rest), /*#__PURE__*/React.createElement(WordCloudContent, {
    cloud: cloud
  }));
};
export default WordCloudWithHeader;