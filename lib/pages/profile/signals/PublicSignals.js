function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import SignalCardsGrid from '../../../components/SignalCard/SignalCardsGrid';
import NoEntries from '../../../components/EmptySection/NoEntries';
import AlertModal from '../../../ducks/Alert/AlertModal';
import styles from './../ProfilePage.module.css';

const PublicSignals = ({
  data: signals,
  userId,
  isOwner
}) => {
  if (!signals || signals.length === 0) {
    return /*#__PURE__*/React.createElement(NoEntries, {
      maxWidth: "358px",
      title: isOwner && 'No Alerts yet',
      desc: isOwner ? 'Start to add alerts you want to track or are just interested in' : "This user doesn't have any alerts yet"
    }, isOwner && /*#__PURE__*/React.createElement(AlertModal, {
      trigger: /*#__PURE__*/React.createElement("span", {
        className: "btn-1 body-3"
      }, "Create alert")
    }));
  }

  const signalsWithUser = signals.map(signal => _objectSpread(_objectSpread({}, signal), {}, {
    userId: userId
  })).sort(({
    id: idA
  }, {
    id: idB
  }) => idB - idA);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(SignalCardsGrid, {
    signals: signalsWithUser,
    deleteEnabled: false,
    classes: styles
  }));
};

export default PublicSignals;