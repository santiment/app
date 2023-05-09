function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid';
import EmptySection from '../../components/EmptySection/EmptySection';
import PageLoader from '../../components/Loader/PageLoader';
import AlertModal from '../../ducks/Alert/AlertModal';
import { DesktopOnly } from '../../components/Responsive';
import { useFeaturedUserTriggers } from '../../ducks/Signals/common/useFeaturedUserTriggers';
import styles from './SonarFeedRecommendations.module.css';

const SonarFeedRecommendations = ({
  showButton,
  description = 'Start to add alerts you want to track or just interested in'
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(EmptySection, {
    className: styles.empty
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), /*#__PURE__*/React.createElement(DesktopOnly, null, showButton && /*#__PURE__*/React.createElement(AlertModal, {
    triggerButtonProps: {
      label: 'Add alert',
      variant: 'fill',
      border: false
    }
  }))));
};

export const RecommendedSignals = ({
  showTitle = true,
  userId,
  shouldDisableActions
}) => {
  const [signals, loading] = useFeaturedUserTriggers();

  if (!signals) {
    return null;
  }

  if (loading) {
    return /*#__PURE__*/React.createElement(PageLoader, {
      className: styles.loader
    });
  }

  const mapped = signals.map(({
    trigger,
    userId
  }) => _objectSpread(_objectSpread({}, trigger), {}, {
    userId: userId
  }));
  const hasSignals = mapped && mapped.length > 0;
  return hasSignals && /*#__PURE__*/React.createElement(React.Fragment, null, showTitle && /*#__PURE__*/React.createElement("h4", {
    className: styles.subtitle
  }, "Recommended for you"), /*#__PURE__*/React.createElement(SignalCardsGrid, {
    isRecommendedSignal: true,
    userId: userId,
    signals: mapped,
    shouldDisableActions: shouldDisableActions
  }));
};
export default SonarFeedRecommendations;