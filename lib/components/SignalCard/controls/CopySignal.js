function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { track } from 'webkit/analytics';
import Icon from '@santiment-network/ui/Icon';
import { AlertsEvents } from '../../../ducks/Alert/analytics';
import { createTrigger } from '../../../ducks/Signals/common/actions';
import { checkIsLoggedIn } from '../../../pages/UserSelectors';
import styles from './CopySignal.module.css';

const CopySignal = ({
  children,
  isAuthor,
  isCreated,
  signal,
  createTrigger,
  onCreate,
  onClose,
  label = 'Copy alert',
  doneLabel = 'Copied to my alerts',
  classes = {},
  btnParams
}) => {
  const [isCreation, setCreation] = useState(false);

  if (isCreated && isCreation) {
    return /*#__PURE__*/React.createElement("button", _extends({
      className: cx(styles.copyBtn, 'btn body-3 row v-center', styles.copiedBtn)
    }, btnParams), doneLabel, /*#__PURE__*/React.createElement(Icon, {
      type: "success-round"
    }));
  }

  if (isAuthor || isCreated) {
    return null;
  }

  const {
    settings
  } = signal;

  if (settings && settings.target && settings.target.watchlist_id > 0) {
    return null;
  }

  function copySignal() {
    track.event(AlertsEvents.ClickShareAlert);

    if (onCreate) {
      onCreate();
    } else {
      const newSignal = _objectSpread({}, signal);

      delete newSignal.id;
      newSignal.isPublic = false;
      createTrigger(newSignal);
      setCreation && setCreation(true);
    }

    if (onClose) {
      onClose();
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement("button", _extends({
    onClick: !isCreation ? copySignal : undefined,
    className: cx(styles.copyBtn, 'btn body-3', classes.copyBtn)
  }, btnParams), label));
};

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload));
  }
});

const mapStateToProps = (state, {
  creatorId,
  signal
}) => {
  const {
    user: {
      data: {
        id
      } = {}
    } = {}
  } = state;
  const isLoggedIn = checkIsLoggedIn(state);
  return {
    isAuthor: +id === +creatorId,
    isLoggedIn: isLoggedIn,
    isCreated: !isLoggedIn || state && state.signals.all && state.signals.all.some(item => item.title === signal.title && isEqual(signal.settings.operation, item.settings.operation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopySignal);