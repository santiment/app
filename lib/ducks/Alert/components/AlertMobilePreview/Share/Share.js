function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Icon from '@santiment-network/ui/Icon';
import ShareModalTrigger from '../../../../../components/Share/ShareModalTrigger';
import Toggle from '../../../../../components/VisibilityIndicator/Toggle';
import { useShortShareLink } from '../../../../../components/Share/hooks';
import { updateTrigger } from '../../../../Signals/common/actions';
import styles from './Share.module.css';

const Share = ({
  signal,
  isAuthor,
  updateAlert
}) => {
  const {
    id
  } = signal;
  const [isPublic, setIsPublic] = useState(signal.isPublic);
  const {
    shortShareLink,
    getShortShareLink
  } = useShortShareLink(`/alert/${id}`);
  useEffect(() => {
    if (isPublic !== signal.isPublic) {
      setIsPublic(signal.isPublic);
    }
  }, [signal.isPublic]);

  function handleToggleVisibility() {
    setIsPublic(!isPublic);
    updateAlert(_objectSpread(_objectSpread({}, signal), {}, {
      isPublic: !isPublic
    }));
  }

  return /*#__PURE__*/React.createElement(ShareModalTrigger, {
    classes: {
      title: cx(styles.shareTitle, 'txt-m')
    },
    dialogTitle: "Share",
    shareLink: shortShareLink,
    isDisabled: isAuthor && !isPublic,
    isMobile: true,
    feature: "alert",
    source: "alerts",
    trigger: props => /*#__PURE__*/React.createElement("button", _extends({}, props, {
      className: cx(styles.trigger, 'btn-2 row hv-center fluid'),
      onMouseDown: getShortShareLink
    }), /*#__PURE__*/React.createElement(Icon, {
      type: "share",
      height: 19,
      width: 17
    }), /*#__PURE__*/React.createElement("span", {
      className: "body-2 mrg-s mrg--l"
    }, "Share"))
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.warningMessage, 'row mrg-m mrg--b', isPublic && styles.warningMessage__hide)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
    type: "alert",
    className: styles.warningMessageIcon
  })), /*#__PURE__*/React.createElement("span", {
    className: "mrg-s mrg--l"
  }, "Your alert is private. To able to share, please, switch it to \u201CPublic\u201D first")), isAuthor && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.toggleWrapper, 'row v-center justify fluid mrg-xl mrg--b')
  }, /*#__PURE__*/React.createElement("span", {
    className: "body-2"
  }, "Private alert"), /*#__PURE__*/React.createElement(Toggle, {
    isActive: isPublic,
    className: "relative",
    onClick: handleToggleVisibility
  })));
};

const mapDispatchToProps = dispatch => ({
  updateAlert: payload => {
    dispatch(updateTrigger(payload));
  }
});

export default connect(null, mapDispatchToProps)(Share);