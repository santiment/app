import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Input from '@santiment-network/ui/Input';
import Icon from '@santiment-network/ui/Icon';
import Loader from '@santiment-network/ui/Loader/Loader';
import Panel from '@santiment-network/ui/Panel';
import MobileWrapper from '../Login/Mobile/MobileWrapper';
import { useUser } from '../../stores/user';
import { useUsernameChange } from '../../hooks/profileChange';
import { USER_USERNAME_CHANGE } from '../../actions/types';
import styles from './index.module.css';

const UsernameChangeModal = ({
  dispatchNewUsername
}) => {
  const history = useHistory();
  const {
    changeUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    username,
    setUsername,
    checkUsername,
    catchUsernameChangeError,
    showUsernameChangedNotifiction
  } = useUsernameChange();
  const saveUsernameButtonHandler = useCallback(() => {
    if (savingUsername) return;
    if (checkUsername(username)) return;
    changeUsername(username).then(() => dispatchNewUsername(username)).then(() => history.replace('/')).then(showUsernameChangedNotifiction).catch(catchUsernameChangeError);
  }, [username, savingUsername, checkUsername, catchUsernameChangeError, changeUsername, showUsernameChangedNotifiction]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, "Account settings update"), /*#__PURE__*/React.createElement("p", {
    className: styles.description
  }, "Please type your username"), /*#__PURE__*/React.createElement("div", {
    className: styles.inputPrefix
  }, /*#__PURE__*/React.createElement(Input, {
    name: "username",
    maxLength: "25",
    autoComplete: "off",
    placeholder: "username",
    onChange: e => {
      setUsername(e.target.value);
      setUsernameError();
    },
    onBlur: e => checkUsername(e.target.value),
    isError: !!usernameError,
    errorText: usernameError,
    className: styles.usernameInput,
    disabled: savingUsername
  })), /*#__PURE__*/React.createElement("ul", {
    className: styles.checkList
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    type: "checkmark"
  })), ' ', "All your messages will be marked to this username"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    type: "checkmark"
  })), ' ', "All charts you create will be assigned this username"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    type: "checkmark"
  })), ' ', "Users will be able to tag you using this username")), /*#__PURE__*/React.createElement(Button, {
    fluid: true,
    className: styles.toggleBtn,
    variant: "fill",
    accent: !savingUsername ? 'positive' : 'grey',
    onClick: saveUsernameButtonHandler
  }, savingUsername ? /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }) : 'Save'));
};

const UsernamePage = ({
  isDesktop,
  dispatchNewUsername
}) => {
  const {
    user
  } = useUser();

  if (!user || user.username) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/"
    });
  }

  return isDesktop ? /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.wrapper)
  }, /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: styles.container
  }, /*#__PURE__*/React.createElement(UsernameChangeModal, {
    dispatchNewUsername: dispatchNewUsername
  }))) : /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true,
    className: styles.mobileWrapper
  }, /*#__PURE__*/React.createElement(UsernameChangeModal, {
    dispatchNewUsername: dispatchNewUsername
  })));
};

const mapDispatchToProps = dispatch => ({
  dispatchNewUsername: username => dispatch({
    type: USER_USERNAME_CHANGE,
    username
  })
});

export default connect(null, mapDispatchToProps)(UsernamePage);