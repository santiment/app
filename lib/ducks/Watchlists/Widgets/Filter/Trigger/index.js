import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '../../../../../components/Tooltip/DarkTooltip';
import filterTooltipImg from '../../../../../assets/tooltips/screener-filter-bg.jpg';
import TooltipWithImg from '../../../../../components/TooltipWithImg/TooltipWithImg';
import styles from './index.module.css';
export const FILTERS_EXPLANATION_TOOLTIP_MARK = '_FILTER_EXPLANATION';

const Trigger = ({
  activeMetricsCount,
  isOpen,
  onClick
}) => {
  if (activeMetricsCount > 0 && !isOpen) {
    return /*#__PURE__*/React.createElement(Tooltip, {
      className: styles.tooltip,
      withArrow: false,
      trigger: /*#__PURE__*/React.createElement(Button, {
        className: styles.button,
        onClick: () => onClick(!isOpen),
        border: true
      }, /*#__PURE__*/React.createElement(Icon, {
        className: styles.icon,
        type: "filter"
      }), /*#__PURE__*/React.createElement("span", {
        className: cx(styles.text, styles.text__active)
      }, "Filter"))
    }, `${activeMetricsCount} filter${activeMetricsCount > 1 ? 's' : ''} applied`);
  }

  if (activeMetricsCount > 0 && isOpen) {
    return /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.button, styles.active),
      border: true,
      onClick: () => onClick(!isOpen)
    }, /*#__PURE__*/React.createElement(Icon, {
      className: styles.icon,
      type: "filter"
    }), /*#__PURE__*/React.createElement("span", {
      className: cx(styles.text, styles.text__active)
    }, "Filter"));
  }

  if (!activeMetricsCount) {
    return /*#__PURE__*/React.createElement(TooltipWithImg, {
      closeTimeout: 500,
      mark: FILTERS_EXPLANATION_TOOLTIP_MARK,
      img: filterTooltipImg,
      forceClose: isOpen,
      align: "end",
      position: "bottom",
      delay: 3000,
      description: "Use filters to narrow down your screener based on specific on-chain, social or other criteria. You can set a unique time frame for each filter, from the last 24 hours up to 1 year."
    }, /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.button, isOpen && styles.active),
      border: true,
      onClick: () => onClick(!isOpen)
    }, /*#__PURE__*/React.createElement(Icon, {
      className: styles.icon,
      type: "filter"
    }), /*#__PURE__*/React.createElement("span", {
      className: cx(styles.text, activeMetricsCount > 0 && styles.text__active)
    }, "Filter")));
  }
};

export default Trigger;