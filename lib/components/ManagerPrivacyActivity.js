import React from 'react';
import { connect } from 'react-redux';
import { Panel, Toggle, Message } from '@santiment-network/ui';
import * as actions from './../actions/types';
import './ManagerPrivacyActivity.css';

const ManagerPrivacyActivity = ({
  privacyPolicyAccepted,
  marketingAccepted,
  togglePrivacyPolicy,
  toggleMarketing
}) => {
  return /*#__PURE__*/React.createElement(Panel, {
    padding: true
  }, /*#__PURE__*/React.createElement("h2", null, "Data & Privacy"), /*#__PURE__*/React.createElement(Message, null, "Manage your activity"), /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy__card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy__card-header"
  }, "Your Sanbase experience"), /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy__card-content"
  }, /*#__PURE__*/React.createElement("p", null, "Process the personal data provided by me for the registration on this website to support and administer my user account."), /*#__PURE__*/React.createElement(Toggle, {
    onClick: togglePrivacyPolicy,
    isActive: privacyPolicyAccepted
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy__card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy__card-header"
  }, "Marketing materials"), /*#__PURE__*/React.createElement("div", {
    className: "gdpr-settings-privacy__card-content"
  }, /*#__PURE__*/React.createElement("p", null, "Contact me to send me marketing materials related to the Company\u2019s services and operations."), /*#__PURE__*/React.createElement(Toggle, {
    onClick: toggleMarketing,
    isActive: marketingAccepted
  })))));
};

const mapStateToProps = state => {
  return {
    privacyPolicyAccepted: state.user.data.privacyPolicyAccepted,
    marketingAccepted: state.user.data.marketingAccepted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePrivacyPolicy: () => {
      dispatch({
        type: actions.USER_TOGGLE_PRIVACY_POLICY
      });
    },
    toggleMarketing: () => {
      dispatch({
        type: actions.USER_TOGGLE_MARKETING
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPrivacyActivity);