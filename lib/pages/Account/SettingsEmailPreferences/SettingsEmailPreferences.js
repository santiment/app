function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Settings from '../Settings';
import EmailPreference from './EmailPreference/EmailPreference';
import { useUpdateUserSettings, useUserSettings } from '../../../stores/user/settings';
import { EMAIL_PREFERENCES } from './constants';
import styles from './SettingsEmailPreferences.module.css';

const SettingsEmailPreferences = () => {
  const {
    settings
  } = useUserSettings();
  const [updateUserSettings] = useUpdateUserSettings();

  function handleUnsubscribeAll() {
    updateUserSettings({
      isSubscribedBiweeklyReport: false,
      isSubscribedCommentsEmails: false,
      isSubscribedEduEmails: false,
      isSubscribedLikesEmails: false,
      isSubscribedMarketingEmails: false,
      isSubscribedMonthlyNewsletter: false
    });
  }

  return /*#__PURE__*/React.createElement(Settings, {
    id: "email-preferences",
    header: "Email Preferences"
  }, EMAIL_PREFERENCES.map(preference => /*#__PURE__*/React.createElement(Settings.Row, {
    key: preference.title
  }, /*#__PURE__*/React.createElement(EmailPreference, _extends({}, preference, {
    settings: settings
  })))), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, 'btn'),
    onClick: handleUnsubscribeAll
  }, "Unsubscribe from all of the above"), /*#__PURE__*/React.createElement("div", {
    className: "c-waterloo"
  }, "You will still receive important administrative emails, such as login information"))));
};

export default SettingsEmailPreferences;