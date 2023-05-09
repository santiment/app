import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Input from '@santiment-network/ui/Input';
import Button from '@santiment-network/ui/Button';
import Notification from '@santiment-network/ui/Notification';
import Loader from '@santiment-network/ui/Loader/Loader';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import Panel from '@santiment-network/ui/Panel';
import * as actions from './../../actions/types';
import MobileWrapper from '../Login/Mobile/MobileWrapper';
import { useUser } from '../../stores/user';
import { useUsernameChange } from '../../hooks/profileChange';
import styles from './index.module.css';

const GdprDescription = ({
  toggleGDPR,
  isGDPR,
  togglePrivacyPolicy,
  dispatchNewUsername
}) => {
  const [GDPRerror, setGDPRerror] = useState(false);
  const {
    changeUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    username,
    setUsername,
    checkUsername,
    catchUsernameChangeError
  } = useUsernameChange();
  const continueButtonHandler = useCallback(() => {
    if (savingUsername) return;
    if (!isGDPR) setGDPRerror(true);
    if (checkUsername(username) || !isGDPR) return;
    changeUsername(username).then(() => {
      dispatchNewUsername(username);
      togglePrivacyPolicy();
    }).catch(catchUsernameChangeError);
  }, [isGDPR, username, savingUsername, checkUsername, catchUsernameChangeError, changeUsername]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, "Welcome to Sanbase"), /*#__PURE__*/React.createElement("p", {
    className: styles.description
  }, "Please type your username to access all features"), /*#__PURE__*/React.createElement("div", {
    className: styles.inputPrefix
  }, /*#__PURE__*/React.createElement(Input, {
    name: "username",
    maxLength: "25",
    autoComplete: "off",
    placeholder: "username",
    onChange: e => {
      setUsernameError();
      setUsername(e.target.value);
    },
    onBlur: e => checkUsername(e.target.value),
    isError: !!usernameError,
    errorText: usernameError,
    className: styles.usernameInput,
    disabled: savingUsername
  })), /*#__PURE__*/React.createElement("p", {
    className: styles.description
  }, "Review and accept our Privacy Policy to continue using Sanbase"), /*#__PURE__*/React.createElement("div", {
    className: styles.check
  }, /*#__PURE__*/React.createElement(Checkbox, {
    isActive: isGDPR,
    onClick: () => {
      setGDPRerror(false);
      toggleGDPR();
    },
    className: cx(styles.checkbox, GDPRerror && styles.checkboxError),
    disabled: savingUsername
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.checkDescription
  }, /*#__PURE__*/React.createElement("label", {
    className: styles.accept,
    onClick: () => {
      setGDPRerror(false);
      toggleGDPR();
    }
  }, "I accept", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://santiment.net/terms/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: styles.link
  }, "Terms"), ' ', "and", ' ', /*#__PURE__*/React.createElement(Link, {
    to: "/privacy-policy",
    className: styles.link
  }, "Privacy Policy"))), GDPRerror && /*#__PURE__*/React.createElement(Notification, {
    className: styles.gdprError,
    hasCloseBtn: false,
    title: "Please agree with the Privacy Policy to sign up",
    size: "small",
    variant: "error"
  })), /*#__PURE__*/React.createElement(Button, {
    className: styles.toggleBtn,
    variant: "fill",
    accent: !savingUsername ? 'positive' : 'grey',
    onClick: continueButtonHandler
  }, savingUsername ? /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }) : 'Continue'));
};

const GDPRPage = ({
  togglePrivacyPolicy,
  dispatchNewUsername,
  isDesktop
}) => {
  const {
    user
  } = useUser();
  const [isGDPR, setGDPR] = useState(false);

  const toggleGDPR = () => setGDPR(!isGDPR);

  if (!user || user.privacyPolicyAccepted) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/"
    });
  }

  const child = /*#__PURE__*/React.createElement(GdprDescription, {
    toggleGDPR: toggleGDPR,
    isGDPR: isGDPR,
    togglePrivacyPolicy: togglePrivacyPolicy,
    dispatchNewUsername: dispatchNewUsername
  });
  return isDesktop ? /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.wrapper)
  }, /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: styles.container
  }, child)) : /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true,
    className: styles.mobileWrapper
  }, child));
};

const mapDispatchToProps = dispatch => {
  return {
    togglePrivacyPolicy: () => {
      dispatch({
        type: actions.USER_TOGGLE_PRIVACY_POLICY
      });
    },
    dispatchNewUsername: username => dispatch({
      type: actions.USER_USERNAME_CHANGE,
      username
    })
  };
};

const enhance = compose(connect(null, mapDispatchToProps));
export default enhance(GDPRPage);