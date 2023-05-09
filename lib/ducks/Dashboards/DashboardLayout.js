import React from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import { MobileOnly } from '../../components/Responsive';
import ResearchesBlock from '../../components/ResearchesBlock';
import CommonFooter from '../../pages/ProMetrics/ProMetricsFooter/CommonFooter';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({
  showResearchers = true,
  classes = {},
  showMobileHeader = true,
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.container)
  }, showMobileHeader && /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MobileHeader, {
    classes: styles
  })), children, showResearchers && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.researchers, classes.researchers)
  }, /*#__PURE__*/React.createElement(ResearchesBlock, null)), /*#__PURE__*/React.createElement(CommonFooter, null));
};

export default withRouter(DashboardLayout);