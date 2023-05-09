import React from 'react';
import cx from 'classnames';
import AlertModal from '../../Alert/AlertModal';
import { prepareAlertTitle } from './utils';
import styles from './OpenSignalLink.module.css';

const OpenSignalLink = ({
  signal,
  children,
  isUserTheAuthor,
  shouldDisableActions,
  isRecommendedSignal,
  isMobile
}) => {
  const {
    id,
    title,
    isFrozen
  } = signal;
  const trigger = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.link, isFrozen && styles.frozenLink, isMobile && cx(styles.linkMobile, 'nowrap line-clamp mrg-m mrg--l'))
  }, prepareAlertTitle(title, isFrozen)), children);
  return /*#__PURE__*/React.createElement(AlertModal, {
    signalData: isRecommendedSignal && signal,
    isRecommendedSignal: isRecommendedSignal,
    shouldDisableActions: shouldDisableActions,
    id: id,
    trigger: trigger,
    isUserTheAuthor: isUserTheAuthor,
    isMobile: isMobile,
    signal: isMobile && signal
  });
};

export default OpenSignalLink;