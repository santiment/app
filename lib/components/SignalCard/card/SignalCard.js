import React from 'react';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel/Panel';
import { canOpenTrigger } from './utils';
import { DesktopOnly, MobileOnly } from '../../Responsive';
import MultilineText from '../../MultilineText/MultilineText';
import SignalCardHeader from './SignalCardHeader';
import SignalCardBottom from './SignalCardBottom';
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink';
import { SignalTypeIcon } from '../controls/SignalControls';
import styles from './SignalCard.module.css';

const SignalCard = ({
  id,
  signal,
  className,
  toggleSignal,
  isUserTheAuthor,
  deleteEnabled = true,
  showMoreActions = true,
  showStatus = true,
  isSharedTriggerForm = false,
  shouldDisableActions,
  isRecommendedSignal
}) => {
  const isAwaiting = +id <= 0;
  const {
    description = '',
    isPublic,
    settings,
    isFrozen,
    settings: {
      type,
      metric
    } = {}
  } = signal;
  const clickable = canOpenTrigger(settings);
  return /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: cx(styles.wrapper, isFrozen && styles.frozenWrapper, className)
  }, isSharedTriggerForm && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(SignalCardHeader, {
    shouldDisableActions: shouldDisableActions,
    deleteEnabled: deleteEnabled,
    isUserTheAuthor: isUserTheAuthor,
    isPublic: isPublic,
    signal: signal
  })), !isSharedTriggerForm && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(SignalCardHeader, {
    shouldDisableActions: shouldDisableActions,
    deleteEnabled: deleteEnabled,
    isUserTheAuthor: isUserTheAuthor,
    isPublic: isPublic,
    signal: signal
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper__right
  }, /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric,
    isFrozen: isFrozen
  }), /*#__PURE__*/React.createElement(OpenSignalLink, {
    isRecommendedSignal: isRecommendedSignal,
    signal: signal,
    isUserTheAuthor: isUserTheAuthor,
    shouldDisableActions: shouldDisableActions,
    isMobile: true
  })), description && /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.description, isFrozen && styles.frozenDescription, 'mrg-m mrg--t')
  }, description), !isRecommendedSignal && /*#__PURE__*/React.createElement(SignalCardBottom, {
    shouldDisableActions: shouldDisableActions,
    signalId: id,
    signal: signal,
    showMoreActions: showMoreActions,
    toggleSignal: toggleSignal,
    isAwaiting: isAwaiting,
    editable: clickable,
    isUserTheAuthor: isUserTheAuthor,
    deleteEnabled: deleteEnabled,
    showStatus: showStatus
  })), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(OpenSignalLink, {
    isRecommendedSignal: isRecommendedSignal,
    signal: signal,
    isUserTheAuthor: isUserTheAuthor,
    shouldDisableActions: shouldDisableActions
  }, /*#__PURE__*/React.createElement("div", {
    className: clickable ? styles.pointer : ''
  }, description && /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.description, isFrozen && styles.frozenDescription)
  }, /*#__PURE__*/React.createElement(MultilineText, {
    id: "SignalCard__description",
    maxLines: 2,
    text: description
  })))), /*#__PURE__*/React.createElement(SignalCardBottom, {
    shouldDisableActions: shouldDisableActions,
    signalId: id,
    signal: signal,
    showMoreActions: showMoreActions,
    toggleSignal: toggleSignal,
    isAwaiting: isAwaiting,
    editable: clickable,
    isUserTheAuthor: isUserTheAuthor,
    deleteEnabled: deleteEnabled,
    showStatus: showStatus
  }))));
};

export default SignalCard;