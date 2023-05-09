import React, { useState } from 'react';
import qs from 'query-string';
import Button from '@santiment-network/ui/Button';
import PageLoader from '../../components/Loader/PageLoader';
import Email from '../../components/Illustrations/Email';
import Success from '../../components/Illustrations/Success';
import { useUser } from '../../stores/user';
import { useUpdateUserSettings, useUserSettings } from '../../stores/user/settings';
import styles from './Unsubscribe.module.css';

const Unsubscribe = () => {
  const [startUpdate, setStartUpdate] = useState(false);
  const {
    md_email: email,
    target
  } = qs.parse(window.location.search);
  const {
    user = {},
    isLoggedIn,
    loading
  } = useUser();
  const {
    loading: settingsLoading,
    settings: {
      alertNotifyEmail
    }
  } = useUserSettings();
  const [updateUserSettings] = useUpdateUserSettings();
  const isLoading = loading || settingsLoading;

  if (!isLoading && isLoggedIn && user.email && alertNotifyEmail && target === 'signals' && !startUpdate) {
    setStartUpdate(true);
    setTimeout(() => updateUserSettings({
      alertNotifyEmail: false
    }), 1000);
  }

  if (target === 'signals' && isLoading) {
    return /*#__PURE__*/React.createElement(PageLoader, {
      className: styles.loader
    });
  }

  return target === 'signals' && (!user || !user.email || !isLoggedIn) ? /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Email, null), /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "Signal email notifications"), /*#__PURE__*/React.createElement("p", {
    className: styles.desc
  }, "Please, log in into account with your email and disable signal email notifications in settings"), /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "positive",
    className: styles.btn,
    as: 'a',
    rel: "noopener noreferrer",
    href: '/login'
  }, "Log in")) : /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Success, null), /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "You've been unsubscribed"), target === 'signals' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: styles.desc
  }, "You succesfully disabled signal email notifications for ", /*#__PURE__*/React.createElement("b", null, user.email), ". If you want to change it, you can manage email notifications in your user settings."), /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "positive",
    className: styles.btn,
    as: 'a',
    rel: "noopener noreferrer",
    href: '/account#notifications'
  }, "Go to account")) : /*#__PURE__*/React.createElement("p", {
    className: styles.desc
  }, "Your email address", /*#__PURE__*/React.createElement("b", null, email ? ` ${email} ` : ' '), " has been removed from our mailing list. We are sorry to see you go, but we won't be sending any more email to your address."));
};

export default Unsubscribe;