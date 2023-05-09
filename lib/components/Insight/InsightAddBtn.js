const _excluded = ["selectedTrends", "dispatch"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { connect } from 'react-redux';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { getInsightTrendTagByDate } from './utils';
import styles from './Insights.module.css';
const trendTags = [getInsightTrendTagByDate(new Date())];
const insightsHref = window.location.origin.replace('app', 'insights');

const InsightAddBtn = _ref => {
  let {
    selectedTrends = [],
    dispatch
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const params = selectedTrends.length ? `currentTrends=${selectedTrends.concat(trendTags).toString()}` : '';
  return /*#__PURE__*/React.createElement(Button, _extends({
    as: "a",
    className: styles.btn,
    accent: "positive",
    variant: "fill",
    href: `${insightsHref}/new?${params}`
  }, props), /*#__PURE__*/React.createElement(Icon, {
    className: styles.icon,
    type: "plus-round"
  }), "Add insight");
};

const mapStateToProps = ({
  hypedTrends: {
    selectedTrends = []
  }
}) => ({
  selectedTrends: [...selectedTrends]
});

export default connect(mapStateToProps)(InsightAddBtn);