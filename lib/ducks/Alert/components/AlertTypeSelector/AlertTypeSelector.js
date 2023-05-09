function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { track } from 'webkit/analytics';
import Type from './Type/Type';
import AlertTooltip from '../../../../components/AlertTooltip/AlertTooltip';
import { ALERT_TYPES } from '../../constants';
import { AlertsEvents } from '../../analytics';
import styles from './AlertTypeSelector.module.css';

const AlertTypeSelector = ({
  selectorSettings,
  isRestrictedMessageClosed
}) => {
  const {
    selectedType,
    setSelectedType,
    setSelectedStep,
    setVisitedSteps,
    setFinishedSteps,
    initialState,
    setInitialState,
    formPreviousValues,
    shouldHideRestrictionMessage
  } = selectorSettings;

  function handleSelectType({
    type,
    isSelected
  }) {
    track.event(AlertsEvents.SetAlertType, {
      type: type.title
    });
    setSelectedType(type);
    setSelectedStep(0);

    if (isSelected) {
      setVisitedSteps(prev => [...prev, 0]);
      setInitialState(formPreviousValues);
    } else {
      setFinishedSteps([]);
      setVisitedSteps([0]);
      setInitialState(_objectSpread(_objectSpread({}, initialState), {}, {
        settings: type.settings
      }));
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, 'row v-center justify')
  }, "Choose an alert category bellow:", /*#__PURE__*/React.createElement(AlertTooltip, {
    isVisible: !shouldHideRestrictionMessage && isRestrictedMessageClosed,
    content: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "txt-m"
    }, "Alert with Duration Restriction."), " Your Alert will be valid for 30 days from the day it\u2019s created. To extend Alert please", ' ', /*#__PURE__*/React.createElement(Link, {
      to: "/pricing",
      className: cx(styles.link, styles.tooltipLink, 'txt-m')
    }, "Upgrade your Plan!"))
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.typesWrapper
  }, ALERT_TYPES.map(type => {
    const isSelected = selectedType && selectedType.title === type.title;
    return /*#__PURE__*/React.createElement(Type, _extends({
      key: type.title
    }, type, {
      onClick: () => handleSelectType({
        type,
        isSelected
      })
    }));
  })));
};

export default AlertTypeSelector;