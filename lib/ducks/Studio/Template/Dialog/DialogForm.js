const _excluded = ["placeholders", "buttonLabel", "defaultValue", "isLoading", "onFormSubmit", "description", "isLoggedIn", "actions"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@santiment-network/ui/Dialog';
import Input from '@santiment-network/ui/Input';
import AutoresizeTextarea from '../../../../components/AutoresizeTextarea';
import LoginPopup from '../../../../components/banners/feature/PopupBanner';
import { checkIsLoggedIn } from '../../../../pages/UserSelectors';
import styles from './DialogForm.module.css';

const DialogForm = _ref => {
  let {
    placeholders = {
      title: 'Name of the template...',
      description: 'Description'
    },
    buttonLabel,
    defaultValue,
    isLoading,
    onFormSubmit,
    description = '',
    isLoggedIn,
    actions
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isOpen, setOpen] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    onFormSubmit({
      title: e.currentTarget.name.value,
      description: e.currentTarget.description.value
    });
  }

  if (!isLoggedIn) {
    const loginProps = props.trigger ? undefined : props;
    return /*#__PURE__*/React.createElement(LoginPopup, loginProps, props.trigger);
  }

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    open: isOpen,
    onClose: () => setOpen(false),
    onOpen: () => {
      setOpen(true);
    }
  }, props, {
    classes: styles
  }), /*#__PURE__*/React.createElement("form", {
    className: styles.wrapper,
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement(Input, {
    autoFocus: true,
    required: true,
    name: "name",
    className: styles.input,
    placeholder: placeholders.title,
    defaultValue: defaultValue
  }), /*#__PURE__*/React.createElement(AutoresizeTextarea, {
    className: styles.textarea,
    placeholder: placeholders.description,
    name: "description",
    defaultValue: description || ''
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Approve, {
    className: styles.btn,
    accent: "positive",
    isLoading: isLoading
  }, buttonLabel), actions)));
};

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
});

export default connect(mapStateToProps)(DialogForm);