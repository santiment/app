import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Toggle from '@santiment-network/ui/Toggle';
import { Button } from '@santiment-network/ui';
import { DesktopOnly } from '../../Responsive';
import StatusLabel from '../../StatusLabel';
import MoreSignalActions from '../controls/MoreSignalActions';
import AlertChannelsTooltip from '../../../ducks/Alert/components/AlertChannelsTooltip/AlertChannelsTooltip';
import RemoveSignalButton from '../controls/RemoveSignalButton';
import styles from './SignalCard.module.css';

const UnpublishedMsg = () => /*#__PURE__*/React.createElement("h4", {
  className: styles.awaiting
}, /*#__PURE__*/React.createElement(Icon, {
  type: "clock",
  className: styles.awaiting__icon
}), " Awaiting posting");

const SignalCardBottom = ({
  signalId,
  signal,
  isPublished = true,
  isAwaiting = false,
  toggleSignal,
  isUserTheAuthor = true,
  deleteEnabled,
  showMoreActions,
  showStatus = true,
  editable = true,
  shouldDisableActions
}) => {
  const {
    isActive,
    isPublic,
    isFrozen,
    title
  } = signal;
  return showStatus && /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, showMoreActions && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(MoreSignalActions, {
    shouldDisableActions: shouldDisableActions,
    isUserTheAuthor: isUserTheAuthor,
    signalTitle: title,
    signalId: signalId,
    isPublic: isPublic,
    deleteEnabled: deleteEnabled,
    editable: editable,
    signal: signal
  })), isPublished ? /*#__PURE__*/React.createElement("h4", {
    className: styles.author
  }, isAwaiting && /*#__PURE__*/React.createElement("div", {
    className: styles.awaitingBlock
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "clock-small"
  }), /*#__PURE__*/React.createElement("span", null, "\xA0\xA0Awaiting confirmation")), isUserTheAuthor && !isAwaiting && /*#__PURE__*/React.createElement(StatusLabel, {
    isPublic: isPublic,
    isFrozen: isFrozen
  })) : /*#__PURE__*/React.createElement(UnpublishedMsg, null), !isFrozen && isUserTheAuthor && signal && signal.settings && signal.settings.channel && /*#__PURE__*/React.createElement(AlertChannelsTooltip, {
    signal: signal
  }), isUserTheAuthor && toggleSignal && !isFrozen && /*#__PURE__*/React.createElement(ToggleSignal, {
    isActive: isActive,
    toggleSignal: toggleSignal
  }), isFrozen && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.frozenActions, 'row hv-center')
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "/pricing",
    rel: "noopener noreferrer",
    target: "_self",
    variant: "fill",
    accent: "positive"
  }, "Extend alert"), /*#__PURE__*/React.createElement(RemoveSignalButton, {
    signalTitle: title,
    id: signalId,
    trigger: () => /*#__PURE__*/React.createElement(Button, {
      className: "mrg--l mrg-l",
      border: true
    }, "Delete")
  })), isFrozen && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.frozenAlert, 'btn-2 btn--s body-3 row hv-center mrg--l mrg-a')
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "frozen",
    className: "mrg-s mrg--r"
  }), "Frozen alert"));
};

export const ToggleSignal = ({
  isActive,
  toggleSignal
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.toggleLabel, !isActive && styles.disabled)
  }, isActive ? 'Enabled' : 'Disabled'), /*#__PURE__*/React.createElement(Toggle, {
    onClick: toggleSignal,
    isActive: isActive
  }));
};
export default SignalCardBottom;