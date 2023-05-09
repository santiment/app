const _excluded = ["forwardedRef", "isActive", "isFrozen"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { track } from 'san-webkit/lib/analytics';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel/Panel';
import Tooltip from '@santiment-network/ui/Tooltip';
import Message from '@santiment-network/ui/Message';
import ShareModalTrigger from '../../Share/ShareModalTrigger';
import { DesktopOnly } from '../../Responsive';
import RemoveSignalButton from './RemoveSignalButton';
import CopySignal from './CopySignal';
import UpdatePublicity from './UpdatePublicity/UpdatePublicity';
import { AlertsEvents } from '../../../ducks/Alert/analytics';
import { mapStateToQS } from '../../../utils/utils';
import styles from '../card/SignalCard.module.css';

const generateShareLink = (id, title) => {
  const {
    origin
  } = window.location;
  return `${origin}/alert/${id}${mapStateToQS({
    title
  })}`;
};

const ShareSignal = ({
  trigger,
  className,
  shareBtnClassName,
  signalId,
  signalTitle,
  signal,
  isDialogOnly,
  isAlert,
  isPublic,
  isUserTheAuthor
}) => {
  const link = generateShareLink(signalId, signalTitle);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.sharePanelBtn, className)
  }, /*#__PURE__*/React.createElement(ShareModalTrigger, {
    source: "alerts",
    feature: "alert",
    isAlert: isAlert,
    isDialogOnly: isDialogOnly,
    trigger: trigger,
    className: shareBtnClassName,
    shareTitle: "Santiment",
    shareText: `Crypto Alert '${signalTitle}'`,
    shareLink: link,
    isDisabled: !isPublic && isUserTheAuthor,
    onOpen: () => track.event(AlertsEvents.ClickShareAlert)
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.messageWrapper, (isPublic || !isUserTheAuthor) && styles.messageWrapper__hide)
  }, /*#__PURE__*/React.createElement(Message, {
    variant: "warn",
    className: styles.message
  }, "Your alert is private. Please, switch it to \u201CPublic\u201D first.")), isUserTheAuthor && /*#__PURE__*/React.createElement(UpdatePublicity, {
    variant: "flat",
    signal: signal,
    className: styles.toggle
  }))));
};

const Trigger = _ref => {
  let {
    forwardedRef,
    isActive,
    isFrozen
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    ref: forwardedRef
  }, props, {
    className: cx('btn row hv-center mrg--r mrg-xl', styles.expandButton, isActive && styles.expandButtonHover, isFrozen && styles.frozenExpandButton)
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "dots"
  }));
};

const MoreSignalActions = ({
  signalId,
  signalTitle,
  isPublic,
  isUserTheAuthor,
  deleteEnabled = true,
  editable = true,
  signal,
  userId,
  shouldDisableActions
}) => {
  const canShare = true;

  if (!isUserTheAuthor) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.buttonWrapper
    }, canShare && /*#__PURE__*/React.createElement(ShareSignal, {
      signal: signal,
      isPublic: isPublic,
      isAlert: true,
      isDialogOnly: true,
      className: styles.shareBtn,
      signalId: signalId,
      signalTitle: signalTitle,
      shareBtnClassName: cx(styles.popupItem, styles.publicShare, 'row v-center btn body-3'),
      trigger: PublicSignalShareTrigger,
      isUserTheAuthor: isUserTheAuthor,
      userId: userId
    }), !shouldDisableActions && /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(CopySignal, {
      signal: signal,
      label: "Copy to my alerts"
    })));
  }

  const {
    isFrozen
  } = signal;
  return /*#__PURE__*/React.createElement(Tooltip, {
    passOpenStateAs: "isActive",
    trigger: /*#__PURE__*/React.createElement(Trigger, {
      isFrozen: isFrozen
    }),
    position: "bottom",
    align: "start"
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.popup
  }, editable && /*#__PURE__*/React.createElement(Link, {
    to: `/alerts/${signalId}${window.location.search}`,
    className: cx(styles.popupItem, 'row v-center btn-ghost body-3')
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "edit"
  }), "Edit"), canShare && /*#__PURE__*/React.createElement(ShareSignal, {
    signal: signal,
    isPublic: isPublic,
    isAlert: true,
    isDialogOnly: true,
    trigger: SignalShareTrigger,
    signalId: signalId,
    signalTitle: signalTitle,
    isUserTheAuthor: isUserTheAuthor,
    userId: userId
  }), deleteEnabled && /*#__PURE__*/React.createElement(RemoveSignalButton, {
    id: signalId,
    signalTitle: signalTitle,
    trigger: () => /*#__PURE__*/React.createElement("button", {
      className: cx(styles.popupItem, 'row v-center btn-ghost body-3')
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "remove"
    }), "Delete")
  })));
};

const PublicSignalShareTrigger = _ref2 => {
  let props = _extends({}, _ref2);

  return /*#__PURE__*/React.createElement("button", props, /*#__PURE__*/React.createElement(Icon, {
    type: "share"
  }), "Share alert");
};

const SignalShareTrigger = _ref3 => {
  let props = _extends({}, _ref3);

  return /*#__PURE__*/React.createElement("button", _extends({}, props, {
    className: cx(styles.popupItem, 'row v-center btn-ghost body-3')
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "share"
  }), "Share");
};

export default MoreSignalActions;