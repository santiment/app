import React from 'react';
import StepTitle from '../StepTitle/StepTitle';
import Block from '../Block/Block';
import NextStep from '../NextStep/NextStep';
import ChannelsSelector from './ChannelsSelector/ChannelsSelector';
import FrequencySelector from './FrequencySelector/FrequencySelector';
import PrivacySelector from './PrivacySelector/PrivacySelector';
import styles from './NotificationAndPrivacy.module.css';

const NotificationAndPrivacy = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  function handleNextClick() {
    setSelectedStep(selectedStep + 1);

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1]);
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.titleWrapper
  }, /*#__PURE__*/React.createElement(StepTitle, {
    title: "Notification & Privacy settings",
    className: styles.title
  }), /*#__PURE__*/React.createElement(NextStep, {
    onClick: handleNextClick,
    label: "Name & Description"
  })), /*#__PURE__*/React.createElement(Block, {
    label: "Alert action",
    className: styles.actionBlock
  }, /*#__PURE__*/React.createElement(ChannelsSelector, null)), /*#__PURE__*/React.createElement(Block, {
    label: "Frequency of notifications",
    className: styles.frequencyBlock
  }, /*#__PURE__*/React.createElement(FrequencySelector, null)), /*#__PURE__*/React.createElement(Block, {
    label: "Privacy settings",
    className: styles.privacyBlock
  }, /*#__PURE__*/React.createElement(PrivacySelector, null)));
};

export default NotificationAndPrivacy;