const _excluded = ["buttonLabel", "isLoading", "onFormSubmit", "name", "open", "toggleOpen", "id", "sets"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import Input from '@santiment-network/ui/Input';
import Label from '@santiment-network/ui/Label';
import { useDebounce } from '../../../../../../../hooks/index';
import { upperCaseFirstLetter } from '../../../../../../../utils/formatting';
import styles from './EditForm.module.css';
const MIN_LENGTH = 3;
const SHORT_NAME_ERROR = `The name should be at least ${MIN_LENGTH} characters`;
const BAD_SYMBOLS_ERROR = "Use only letters, numbers, whitespace and _-.'/,";
const NAME_EXISTS_ERROR = 'You have already used this name';
const ALLOWED_SYMBOLS_REGEXP = /^([.\-/_' ,\w]*)$/;
const EMPTY_ARRAY = [];

const EditForm = _ref => {
  let {
    buttonLabel,
    isLoading,
    onFormSubmit,
    name: defaultName,
    open: isOpen,
    toggleOpen,
    id,
    sets
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [formState, setFormState] = useState({
    name: defaultName
  });
  const debouncedCheckName = useDebounce(checkName, 300);

  function onSubmit(evt) {
    evt.preventDefault();
    const {
      name,
      error
    } = formState;

    if (!error) {
      checkName(name);
    }

    if (error) {
      return;
    }

    if (name === defaultName) {
      toggleOpen(false);
    } else {
      onFormSubmit(upperCaseFirstLetter(name));
    }
  }

  function onInputChange({
    currentTarget: {
      value: name
    }
  }) {
    setFormState(state => _objectSpread(_objectSpread({}, state), {}, {
      name
    }));
    debouncedCheckName(name);
  }

  function checkName(name = '') {
    let error = '';
    const hasSameName = sets.filter(set => set.title.toLowerCase() === name.toLowerCase());

    if (!name || name.length < MIN_LENGTH) {
      error = SHORT_NAME_ERROR;
    }

    if (!ALLOWED_SYMBOLS_REGEXP.test(name)) {
      error = BAD_SYMBOLS_ERROR;
    }

    if (hasSameName.length > 0 && !(hasSameName.length === 1 && hasSameName[0].id === id)) {
      error = NAME_EXISTS_ERROR;
    }

    setFormState(state => _objectSpread(_objectSpread({}, state), {}, {
      error
    }));
  }

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    open: isOpen,
    onClose: () => {
      toggleOpen(false);
      setFormState({
        name: defaultName
      });
    },
    onOpen: () => {
      toggleOpen(true);
      setFormState({
        name: defaultName
      });
    }
  }, props, {
    classes: styles
  }), /*#__PURE__*/React.createElement("form", {
    className: styles.wrapper,
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    className: styles.name__label
  }, `Name (${formState.name.length}/25)`), /*#__PURE__*/React.createElement(Input, {
    autoFocus: true,
    name: "name",
    className: styles.input,
    placeholder: "For example, Social movements",
    maxLength: "30",
    defaultValue: formState.name,
    onChange: e => formState.error && onInputChange(e),
    onBlur: onInputChange,
    isError: formState.error,
    errorText: formState.error,
    autoComplete: "off"
  }), /*#__PURE__*/React.createElement("button", {
    // hack for submiting form
    type: "submit",
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Approve, {
    className: styles.btn,
    accent: "positive",
    isLoading: isLoading,
    disabled: isLoading
  }, buttonLabel), /*#__PURE__*/React.createElement(Dialog.Cancel, {
    className: styles.btn
  }, "Cancel"))));
};

EditForm.defaultProps = {
  name: '',
  sets: EMPTY_ARRAY
};
export default EditForm;