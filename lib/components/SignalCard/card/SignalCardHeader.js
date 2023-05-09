import React from 'react';
import cx from 'classnames';
import { SignalTypeIcon } from '../controls/SignalControls';
import { MobileOnly } from '../../Responsive';
import MoreSignalActions from '../controls/MoreSignalActions';
import styles from './SignalCard.module.css';

const SignalCardHeader = ({
  deleteEnabled,
  isUserTheAuthor,
  isPublic,
  signal,
  shouldDisableActions
}) => {
  const {
    id,
    title,
    settings: {
      type,
      metric
    } = {},
    isFrozen
  } = signal;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper__left, styles.wrapper__left_subscription)
  }, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric,
    isFrozen: isFrozen
  }), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MoreSignalActions, {
    shouldDisableActions: shouldDisableActions,
    signal: signal,
    deleteEnabled: deleteEnabled,
    isUserTheAuthor: isUserTheAuthor,
    isPublic: isPublic,
    signalTitle: title,
    signalId: id
  })));
};

export default SignalCardHeader;