import React from 'react';
import { connect } from 'react-redux';
import Input from '@santiment-network/ui/Input';
import Icon from '@santiment-network/ui/Icon';
import Dialog from '@santiment-network/ui/Dialog';
import DarkTooltip from '../../../components/Tooltip/DarkTooltip';
import { useUsernameChange, useFullnameChange } from '../../../hooks/profileChange';
import { useUser } from '../../../stores/user';
import * as actions from '../../../actions/types';
import styles from './ProfileInfo.module.css';

const EditProfile = ({
  onClose,
  dispatchNewUsername,
  dispatchNewName
}) => {
  const {
    user
  } = useUser();
  const {
    username,
    setUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    checkUsername,
    changeUsername,
    catchUsernameChangeError
  } = useUsernameChange(user.username);
  const {
    fullname,
    setFullname,
    setFullnameError,
    fullnameError,
    checkFullname,
    savingFullname,
    catchFullnameChangeError,
    showFullnameChangedNotifiction,
    changeFullname
  } = useFullnameChange(user.name);

  async function saveButtonHandler(e) {
    e.preventDefault();
    if (savingFullname || savingUsername || checkUsername(username) || checkFullname(fullname)) return;

    if (user.username === username && user.name === fullname) {
      onClose();
      return;
    }

    let hasError = false;

    try {
      await changeUsername(username);
      dispatchNewUsername(username);
    } catch (e) {
      hasError = true;
      catchUsernameChangeError(e);
    }

    try {
      await changeFullname(fullname);
      dispatchNewName(fullname);
    } catch (e) {
      hasError = true;
      catchFullnameChangeError(e);
    }

    if (!hasError) {
      showFullnameChangedNotifiction('Changes successfully saved');
      onClose();
    }
  }

  const loading = savingFullname || savingUsername;
  return /*#__PURE__*/React.createElement("form", {
    className: styles.modalContent,
    onSubmit: saveButtonHandler
  }, /*#__PURE__*/React.createElement("label", {
    className: styles.label
  }, /*#__PURE__*/React.createElement(DarkTooltip, {
    trigger: /*#__PURE__*/React.createElement("div", null, "Full name ", /*#__PURE__*/React.createElement(Icon, {
      type: "info-round"
    })),
    position: "top",
    align: "start"
  }, "Official assignation for visitors to your user profile")), /*#__PURE__*/React.createElement(Input, {
    name: "name",
    autoComplete: "off",
    placeholder: "name",
    defaultValue: user.name,
    onChange: e => {
      setFullnameError();
      setFullname(e.target.value);
    },
    onBlur: e => checkFullname(e.target.value),
    isError: !!fullnameError,
    errorText: fullnameError,
    disabled: loading
  }), /*#__PURE__*/React.createElement("label", {
    className: styles.label
  }, /*#__PURE__*/React.createElement(DarkTooltip, {
    trigger: /*#__PURE__*/React.createElement("div", null, "Username ", /*#__PURE__*/React.createElement(Icon, {
      type: "info-round"
    })),
    position: "top",
    align: "start"
  }, "Service assignation for any interactions on Sanbase")), /*#__PURE__*/React.createElement("div", {
    className: styles.inputPrefix
  }, /*#__PURE__*/React.createElement(Input, {
    name: "username",
    maxLength: "25",
    autoComplete: "off",
    placeholder: "username",
    defaultValue: user.username,
    onChange: e => {
      setUsernameError();
      setUsername(e.target.value);
    },
    onBlur: e => checkUsername(e.target.value),
    isError: !!usernameError,
    errorText: usernameError,
    className: styles.usernameInput,
    disabled: loading
  })), /*#__PURE__*/React.createElement(Dialog.Actions, {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Approve, {
    isLoading: loading,
    onClick: saveButtonHandler,
    type: "submit"
  }, "Save"), /*#__PURE__*/React.createElement(Dialog.Cancel, {
    disabled: loading,
    onClick: onClose,
    type: "button"
  }, "Cancel")));
};

const mapDispatchToProps = dispatch => ({
  dispatchNewUsername: username => dispatch({
    type: actions.USER_USERNAME_CHANGE,
    username
  }),
  dispatchNewName: name => dispatch({
    type: actions.USER_NAME_CHANGE,
    name
  })
});

export default connect(null, mapDispatchToProps)(EditProfile);