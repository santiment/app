const _excluded = ["connectTelegram", "isTelegramConnecting", "telegramDeepLink", "classes", "className", "children"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import * as actions from '../../actions/types';
import Loader from '@santiment-network/ui/Loader/Loader';
import Button from '@santiment-network/ui/Button';
import Label from '@santiment-network/ui/Label';
import { useUserSettings } from '../../stores/user/settings';
import styles from './AccountPage.module.css';

const TgButton = _ref => {
  let {
    connectTelegram,
    isTelegramConnecting,
    telegramDeepLink,
    classes,
    className,
    children
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Button, _extends({
    as: "a",
    className: cx(styles.connect_telegram, classes.right, className),
    href: telegramDeepLink,
    rel: "noopener noreferrer",
    target: "_blank",
    onClick: connectTelegram
  }, rest), children);
};

const ConnectTelegramBlock = ({
  generateTelegramDeepLink,
  connectTelegram,
  isTelegramConnecting,
  telegramDeepLink,
  classes = {}
}) => {
  const {
    settings: {
      hasTelegramConnected
    }
  } = useUserSettings();
  useEffect(() => {
    !telegramDeepLink && generateTelegramDeepLink();
  }, [telegramDeepLink]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.telegram, classes.container)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.setting__left, classes.left)
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.label
  }, "Telegram"), /*#__PURE__*/React.createElement(Label, {
    className: cx(styles.label, styles.setting__description),
    accent: "waterloo"
  }, "Connect the notification bot to your Telegram account")), isTelegramConnecting && /*#__PURE__*/React.createElement(Loader, {
    className: styles.connecting_telegram
  }), telegramDeepLink && /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(TgButton, {
    variant: "fill",
    accent: "positive",
    classes: classes,
    disabled: isTelegramConnecting || hasTelegramConnected,
    telegramDeepLink: telegramDeepLink,
    connectTelegram: connectTelegram
  }, isTelegramConnecting ? 'Connecting' : hasTelegramConnected ? 'Connected' : 'Connect'), hasTelegramConnected && /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Have another account?", ' ', /*#__PURE__*/React.createElement(TgButton, {
    accent: "positive",
    classes: classes,
    disabled: isTelegramConnecting,
    telegramDeepLink: telegramDeepLink,
    connectTelegram: connectTelegram,
    className: styles.link
  }, "Reconnect"))));
};

const mapStateToProps = ({
  user: {
    data: {
      settings: {
        telegramDeepLink,
        isTelegramConnecting
      } = {}
    }
  }
}) => ({
  telegramDeepLink,
  isTelegramConnecting
});

const mapDispatchToProps = dispatch => ({
  generateTelegramDeepLink: () => dispatch({
    type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectTelegramBlock);