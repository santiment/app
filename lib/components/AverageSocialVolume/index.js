const _excluded = ["hasPremium", "isDesktop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Tooltip from '@santiment-network/ui/Tooltip';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import HelpPopup from '../HelpPopup/HelpPopup';
import Content from './Content';
import PaywallBanner from './PaywallBanner';
import { PERIODS } from './utils';
import styles from './index.module.css';
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.css';

const AverageSocialVolume = _ref => {
  let {
    hasPremium,
    isDesktop
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [period, setPeriod] = useState(PERIODS[0]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.header, 'row v-center justify mrg-l mrg--b')
  }, /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: cx(isDesktop ? 'body-3 mrg-s' : 'body-1 mrg-l', 'mrg--r')
  }, "Average"), /*#__PURE__*/React.createElement(HelpPopup, null, /*#__PURE__*/React.createElement("h4", {
    className: stylesTooltip.title
  }, "Average Social Volume"), "The average number of daily mentions in the past ", period.text)), /*#__PURE__*/React.createElement(Tooltip, {
    on: "click",
    shown: isTooltipOpen,
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "flat",
      border: true,
      className: cx(styles.trigger, !isDesktop && 'body-3 row hv-center'),
      onClick: () => setIsTooltipOpen(true)
    }, period.label),
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, PERIODS.map(item => /*#__PURE__*/React.createElement("span", {
    className: cx(styles.period, item.label === period.label && styles.selected),
    key: item.label,
    onClick: () => {
      setPeriod(item);
      setIsTooltipOpen(false);
    }
  }, item.label))))), hasPremium && /*#__PURE__*/React.createElement(Content, _extends({}, props, {
    range: period.query
  })), hasPremium === false && /*#__PURE__*/React.createElement(PaywallBanner, {
    isMobile: !isDesktop
  }));
};

export default AverageSocialVolume;