import React from 'react';
import { connect } from 'react-redux';
import Label from '@santiment-network/ui/Label';
import Toggle from '@santiment-network/ui/Toggle';
import { ui, useTheme } from '@/stores/ui/theme';
import Settings from './Settings';
import UsernameSetting from './userName/UsernameSetting';
import NameSetting from './name/NameSetting';
import AvatarSettings from './avatar/AvatarSettings';
import AlertMessage from '../../components/Alert/AlertMessage';
import * as actions from '../../actions/types';
import styles from './AccountPage.module.css';

const SettingsGeneral = ({
  email,
  username,
  name,
  avatarUrl,
  dispatchNewUsername,
  dispatchNewName,
  toggleBetaMode,
  isBetaModeEnabled
}) => {
  const {
    nightMode
  } = useTheme();
  return /*#__PURE__*/React.createElement(React.Fragment, null, !email && /*#__PURE__*/React.createElement(AlertMessage, {
    text: "Please connect your email to access all features of Sanbase.",
    warning: true
  }), /*#__PURE__*/React.createElement(Settings, {
    id: "general",
    header: "General"
  }, /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(AvatarSettings, {
    avatarUrl: avatarUrl
  })), /*#__PURE__*/React.createElement(NameSetting, {
    dispatchNewName: dispatchNewName,
    name: name
  }), /*#__PURE__*/React.createElement(UsernameSetting, {
    dispatchNewUsername: dispatchNewUsername,
    username: username,
    name: name
  }), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement("div", {
    className: styles.setting__left
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.label
  }, "Night mode")), /*#__PURE__*/React.createElement(Toggle, {
    isActive: nightMode,
    onClick: ui.toggleNightMode
  })), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement("div", {
    className: styles.setting__left
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.label
  }, "Beta mode")), /*#__PURE__*/React.createElement(Toggle, {
    isActive: isBetaModeEnabled,
    onClick: toggleBetaMode
  }))));
};

const mapStateToProps = ({
  rootUi: {
    isBetaModeEnabled
  }
}) => ({
  isBetaModeEnabled
});

const mapDispatchToProps = dispatch => ({
  dispatchNewUsername: username => dispatch({
    type: actions.USER_USERNAME_CHANGE,
    username
  }),
  dispatchNewName: name => dispatch({
    type: actions.USER_NAME_CHANGE,
    name
  }),
  toggleBetaMode: () => dispatch({
    type: actions.USER_TOGGLE_BETA_MODE
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsGeneral);