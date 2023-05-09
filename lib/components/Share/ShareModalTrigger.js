const _excluded = ["shareTitle", "shareText", "shareLink", "trigger", "isDisabled", "children", "classes", "dialogTitle", "isDialogOnly", "isAlert", "isMobile", "onOpen"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@santiment-network/ui/Dialog';
import { trackShareFormOpen } from 'webkit/analytics/events/interaction';
import SharePanel from './SharePanel';
import ShareBtn from './ShareBtn';

const ShareModalTrigger = _ref => {
  let {
    shareTitle,
    shareText,
    shareLink,
    trigger: Trigger = ShareBtn,
    isDisabled,
    children,
    classes,
    dialogTitle = 'Share the data',
    isDialogOnly,
    isAlert,
    isMobile,
    onOpen
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return !isDialogOnly && window.navigator.share ? /*#__PURE__*/React.createElement(Trigger, _extends({}, props, {
    onClick: () => {
      trackShareFormOpen({
        source: props.source,
        feature: props.feature
      });
      window.navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareLink
      });
    }
  })) : /*#__PURE__*/React.createElement(Dialog, _extends({
    size: "m",
    trigger: isDialogOnly && !isAlert ? null : /*#__PURE__*/React.createElement(Trigger, props),
    title: dialogTitle,
    classes: classes,
    onOpen: onOpen
  }, props), /*#__PURE__*/React.createElement(SharePanel, {
    source: props.source,
    feature: props.feature,
    isMobile: isMobile,
    isAlert: isAlert,
    children: children,
    isDisabled: isDisabled,
    shareTitle: shareTitle,
    shareText: shareText,
    shareLink: shareLink
  }));
};

ShareModalTrigger.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string
};
ShareModalTrigger.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!'
};
export default ShareModalTrigger;