function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip';
import styles from './SidecarExplanationTooltip.module.css';
const LS_SIDECAR_TOOLTIP_SHOWN = 'LS_SIDECAR_TOOLTIP_SHOWN';
const TOOLTIP_DELAY_IN_MS = 10000;
export const markedAsShowed = localStorageSuffix => {
  return localStorage.getItem(LS_SIDECAR_TOOLTIP_SHOWN + localStorageSuffix);
};

const SidecarExplanationTooltip = props => {
  const [shown, setShown] = useState(false);
  return /*#__PURE__*/React.createElement(ForceClosableExplanationTooltip, _extends({}, props, {
    shown: shown,
    setShown: setShown
  }));
};

export const ForceClosableExplanationTooltip = props => {
  const {
    localStorageSuffix = '',
    dismissOnTouch = false,
    delay = TOOLTIP_DELAY_IN_MS,
    showEnabled = true,
    setShown = () => {},
    shown,
    onHide,
    forceClose
  } = props;
  const [forceClosed, setForceClosed] = useState(false);
  const localStorageLabel = LS_SIDECAR_TOOLTIP_SHOWN + localStorageSuffix;
  const wasShown = markedAsShowed(localStorageSuffix);
  const canShow = !wasShown && !forceClosed && shown;
  const [timer, setTimer] = useState();

  function hideTooltip() {
    localStorage.setItem(localStorageLabel, '+');
    setForceClosed(true); // HACK(vanguard): To immediatly hide tooltip and then back to not controlled state

    setTimeout(() => setShown(undefined), 0);
    onHide && onHide();
  }

  function disableHelp() {
    localStorage.setItem(localStorageLabel, '+');
    clearTimeout(timer);
    onHide && onHide();
  }

  useEffect(() => {
    if (!wasShown && showEnabled) {
      setTimer(setTimeout(() => setShown(true), delay));
    }

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (forceClose) {
      hideTooltip();
    }
  }, [props.forceClose]);
  useEffect(() => {
    if (dismissOnTouch) {
      window.addEventListener('touchstart', hideTooltip);
    }

    return () => window.removeEventListener('touchstart', hideTooltip);
  }, []);
  return /*#__PURE__*/React.createElement(ExplanationTooltipWrapper, _extends({}, props, {
    disableHelp: disableHelp,
    hideTooltip: hideTooltip,
    shown: canShow,
    dismissOnTouch: dismissOnTouch
  }));
};
export const ExplanationTooltipWrapper = props => {
  const {
    dismissOnTouch = false,
    shown = true,
    hideTooltip = () => {},
    disableHelp = () => {},
    className,
    position = 'left',
    withArrow = false,
    align = 'start',
    closable = true,
    classes = {},
    closeEl: CloseIcon = CloseTrigger,
    as = 'div'
  } = props;
  return /*#__PURE__*/React.createElement(ExplanationTooltip, _extends({}, props, {
    className: cx(styles.wrapper, className),
    shown: shown,
    position: position,
    withArrow: withArrow,
    align: align,
    as: as,
    onOpen: shown ? undefined : disableHelp,
    text: /*#__PURE__*/React.createElement("div", {
      className: cx(styles.content, classes.tooltipContent)
    }, /*#__PURE__*/React.createElement(Content, props), shown && !dismissOnTouch && closable && /*#__PURE__*/React.createElement(CloseIcon, {
      onClick: hideTooltip,
      classes: classes
    }))
  }));
};

const Content = ({
  title = 'Explore assets',
  description = 'Quick navigation through your assets',
  isNew,
  content
}) => {
  if (content) {
    return content;
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, [isNew && /*#__PURE__*/React.createElement("span", {
    className: styles.new,
    key: "new"
  }, "New!"), /*#__PURE__*/React.createElement("span", {
    key: "title"
  }, title)]), description && /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, description));
};

const CloseTrigger = ({
  classes = {},
  onClick
}) => /*#__PURE__*/React.createElement(Icon, {
  type: "close-small",
  className: cx(styles.btn, classes.tooltipClose),
  onClick: onClick
});

export default SidecarExplanationTooltip;