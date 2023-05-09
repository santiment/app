import React from 'react';
import cx from 'classnames';
import noDataImg from '../../../../assets/signals/backtest_empty.svg';
import HelpPopup from '../../../../components/HelpPopup/HelpPopup';
import styles from './NoSignalPreview.module.css';

const NoSignalPreview = ({
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, className)
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.noDataImg,
    src: noDataImg,
    alt: "no_signal_preview"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.explanation
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.label
  }, "No chart available"), /*#__PURE__*/React.createElement(HelpPopup, null, "We currently don't have enough data to display this. Support of backtesting charts for this signal will be added soon!")));
};

export default NoSignalPreview;