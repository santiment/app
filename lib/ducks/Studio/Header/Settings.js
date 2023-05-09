function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import copy from 'copy-to-clipboard';
import { track } from 'webkit/analytics';
import { Event } from 'studio/analytics';
import Calendar from './Calendar';
import MetricsExplanation, { filterExplainableMetrics } from '../Chart/Sidepanel/MetricsExplanation';
import { METRICS_EXPLANATION_PANE } from '../Chart/Sidepanel/panes';
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger';
import { useShortShareLink } from '../../../components/Share/hooks';
import { SAN_HEADER_HEIGHT } from '../../../constants';
import styles from './Settings.module.css';

function getBrowserUrl() {
  const {
    origin,
    pathname
  } = window.location;
  return Promise.resolve(origin + pathname);
}

export const CopyLink = ({
  shareLink,
  getShareLink,
  className
}) => {
  const [timer, setTimer] = useState();
  useEffect(() => () => clearTimeout(timer), [timer]);

  function onClick() {
    getShareLink().then(copy);
    setTimer(setTimeout(() => setTimer(), 2000));
    track.event(Event.CopyLink);
  }

  return /*#__PURE__*/React.createElement(Button, {
    border: true,
    className: cx(styles.share, className),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "link",
    className: styles.share__icon
  }), timer ? 'Copied!' : 'Copy link');
};
export const ShareButton = ({
  sharePath,
  shortUrlHash,
  controller
}) => {
  const {
    shortShareLink,
    getShortShareLink
  } = useShortShareLink(sharePath);
  const shareLink = shortUrlHash ? window.location.href : shortShareLink;
  const getShareLink = shortUrlHash ? getBrowserUrl : controller ? () => getShortShareLink(controller()) : getShortShareLink;

  function onMouseDown() {
    getShareLink();
    track.event(Event.Share);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ShareModalTrigger, {
    trigger: props => /*#__PURE__*/React.createElement(Button, _extends({}, props, {
      border: true,
      onMouseDown: onMouseDown,
      className: styles.share
    }), /*#__PURE__*/React.createElement(Icon, {
      type: "share",
      className: styles.share__icon
    }), "Share"),
    classes: styles,
    shareLink: shareLink
  }), /*#__PURE__*/React.createElement(CopyLink, {
    shareLink: shortShareLink,
    getShareLink: getShareLink
  }));
};
export default (({
  className,
  headerRef,
  metrics,
  settings,
  sidepanel,
  sharePath,
  shortUrlHash,
  controller,
  isOverviewOpened,
  changeTimePeriod,
  toggleSidepanel,
  toggleOverview
}) => {
  const hasExplanaibles = useMemo(() => filterExplainableMetrics(metrics).length > 0, [metrics]);
  useEffect(() => {
    const {
      current: header
    } = headerRef;
    let transform;

    if (isOverviewOpened) {
      let {
        top
      } = header.getBoundingClientRect();

      if (window.scrollY < SAN_HEADER_HEIGHT) {
        top -= SAN_HEADER_HEIGHT - window.scrollY - 1;
      }

      transform = `translateY(-${top}px)`;
    } else {
      transform = null;
    }

    header.style.transform = transform;
  }, [isOverviewOpened]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(Calendar, {
    settings: settings,
    changeTimePeriod: changeTimePeriod
  }), !isOverviewOpened && hasExplanaibles && /*#__PURE__*/React.createElement(MetricsExplanation.Button, {
    onClick: () => toggleSidepanel(METRICS_EXPLANATION_PANE),
    className: cx(styles.explain, sidepanel === METRICS_EXPLANATION_PANE && styles.explain_active)
  }), /*#__PURE__*/React.createElement(ShareButton, {
    shortUrlHash: shortUrlHash,
    sharePath: sharePath,
    controller: controller
  }), /*#__PURE__*/React.createElement(Button, {
    border: true,
    className: cx(styles.mapview, isOverviewOpened && styles.mapview_active),
    onClick: toggleOverview
  }, isOverviewOpened ? 'Close' : 'Open', " Mapview"));
});