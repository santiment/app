function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import InsightCard from './InsightCard';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './InsightsWrap.module.css';

const InsightsWrap = ({
  insights,
  isDesktop,
  withAuthorPic = false,
  classes = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.insights, classes.insights)
  }, insights.slice(0, 9).map(insight => /*#__PURE__*/React.createElement(InsightCard, _extends({
    isDesktop: isDesktop,
    disabled: true,
    withAuthorPic: withAuthorPic
  }, insight, {
    key: insight.id,
    showDate: true,
    className: cx(styles.insightCard, classes.insightCard)
  }))));
};

export default withSizes(mapSizesToProps)(InsightsWrap);