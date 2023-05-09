import React, { Fragment, useState } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { Filter } from '../../dataHub/types';
import { ProLabel } from '../../../../../../components/ProLabel';
import ProPopupWrapper from '../../../../../../components/ProPopup/Wrapper';
import styles from './TypeDropdown.module.css';
const METRIC_SEPARATOR = Filter.percent_up.key;

const TypeDropdown = ({
  isPro,
  type,
  onChange,
  showPercentFilters,
  isOnlyPercentFilters,
  isDefaultOpen
}) => {
  const [open, setOpen] = useState(!!isDefaultOpen);
  return /*#__PURE__*/React.createElement(ContextMenu, {
    on: "click",
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "flat",
      border: true,
      className: styles.trigger
    }, /*#__PURE__*/React.createElement("img", {
      src: Filter[type].icon,
      alt: "filter type",
      className: styles.img
    })),
    position: "bottom",
    align: "start",
    open: open,
    onClose: () => setOpen(false),
    onOpen: () => setOpen(true),
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, Object.values(Filter).map(({
    icon,
    label,
    key,
    showTimeRange
  }) => {
    const isDisabled = Filter[key].isPro && !isPro;
    const badge = Filter[key].badge;
    let isShow = true;

    if (!showPercentFilters && showTimeRange || isOnlyPercentFilters && badge !== '%') {
      isShow = false;
    }

    return isShow ? /*#__PURE__*/React.createElement(Fragment, {
      key: key
    }, key === METRIC_SEPARATOR && /*#__PURE__*/React.createElement("div", {
      className: cx(styles.separator, isOnlyPercentFilters && styles.separator__first)
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.label
    }, "Percentage change"), /*#__PURE__*/React.createElement(ProPopupWrapper, {
      type: "screener"
    }, !isPro && /*#__PURE__*/React.createElement(ProLabel, null))), isDisabled && !isPro ? /*#__PURE__*/React.createElement(ProPopupWrapper, {
      type: "screener"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      fluid: true,
      className: styles.button
    }, /*#__PURE__*/React.createElement("img", {
      src: icon,
      alt: "filter type",
      className: styles.img
    }), label, badge && ` ${badge}`)) : /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      fluid: true,
      className: styles.button,
      onClick: () => {
        onChange(key);
        setOpen(false);
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: icon,
      alt: "filter type",
      className: styles.img
    }), label, badge && ` ${badge}`)) : null;
  })));
};

export default TypeDropdown;