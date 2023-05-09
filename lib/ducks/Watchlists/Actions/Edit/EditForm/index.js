const _excluded = ["id", "type", "isLoading", "toggleOpen", "open", "onFormSubmit", "defaultSettings", "buttonLabel", "watchlist"],
      _excluded2 = ["settings"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import Input from '@santiment-network/ui/Input';
import Label from '@santiment-network/ui/Label';
import { SCREENER } from '../../../detector';
import { useDebounce } from '../../../../../hooks/index';
import PublicityToggle from '../../ChangeVisibility/Toggle';
import Assets from './Assets';
import { useUserWatchlists } from '../../../gql/lists/hooks';
import styles from './index.module.css';
const MIN_LENGTH = 3;
const SHORT_NAME_ERROR = `The name should be at least ${MIN_LENGTH} characters`;
const BAD_SYMBOLS_ERROR = "Use only letters, numbers, whitespace and _-.'/,";
const NAME_EXISTS_ERROR = 'You have already used this name';
const ALLOWED_SYMBOLS_REGEXP = /^([.\-/_' ,\w]*)$/;
const DUPLICATE_LABELS = ['Duplicate', 'Save as'];

const EditForm = _ref => {
  let {
    id,
    type,
    isLoading,
    toggleOpen,
    open: isOpen,
    onFormSubmit,
    defaultSettings,
    buttonLabel = 'Apply changes',
    watchlist
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [lists] = useUserWatchlists(type);
  const [formState, setFormState] = useState(defaultSettings);
  const [preSelectedItems, setPreSelectedItems] = useState([]);
  const debouncedCheckName = useDebounce(checkName, 300);
  const placeholder = type === SCREENER ? 'Most price performance' : 'Favorites';
  useEffect(() => {
    const comparingAssetsChangeHandler = ({
      detail
    }) => setPreSelectedItems(detail);

    window.addEventListener('comparingAssetsChanged', comparingAssetsChangeHandler, false);
    return () => window.removeEventListener('comparingAssetsChanged', comparingAssetsChangeHandler, false);
  }, []);

  function onSubmit(evt) {
    evt.preventDefault();
    let err = '';
    const {
      name,
      description,
      isPublic,
      listItems,
      error
    } = formState;

    if (!error) {
      err = checkName(name);
    }

    if (error || err) {
      return;
    }

    if (name === defaultSettings.name && description === defaultSettings.description && isPublic === defaultSettings.isPublic && listItems === defaultSettings.listItems && id) {
      toggleOpen(false);
    } else {
      onFormSubmit({
        name,
        description,
        isPublic,
        listItems
      });
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

  function onTextareaChange({
    currentTarget: {
      value: description
    }
  }) {
    setFormState(state => _objectSpread(_objectSpread({}, state), {}, {
      description
    }));
  }

  function onToggleClick(evt) {
    evt.preventDefault();
    setFormState(state => {
      const isPublic = !state.isPublic;
      return _objectSpread(_objectSpread({}, state), {}, {
        isPublic
      });
    });
  }

  function checkName(name = '') {
    let error = '';
    const comparedName = name.trim().toLowerCase();
    const hasSameName = lists.filter(list => list.name.toLowerCase() === comparedName);

    if (!comparedName || comparedName.length < MIN_LENGTH) {
      error = SHORT_NAME_ERROR;
    }

    if (!ALLOWED_SYMBOLS_REGEXP.test(comparedName)) {
      error = BAD_SYMBOLS_ERROR;
    }

    if (hasSameName.length > 0 && !(hasSameName.length === 1 && hasSameName[0].id === id)) {
      error = NAME_EXISTS_ERROR;
    }

    setFormState(state => _objectSpread(_objectSpread({}, state), {}, {
      error
    }));
    return error;
  }

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    open: isOpen,
    onClose: () => {
      toggleOpen(false);
      window.dispatchEvent(new CustomEvent('panelVisibilityChange', {
        detail: 'show'
      }));
    },
    onOpen: () => {
      setFormState(_objectSpread({}, defaultSettings));
      toggleOpen(true);
      window.dispatchEvent(new CustomEvent('panelVisibilityChange', {
        detail: 'hide'
      }));
    },
    classes: styles
  }, props), /*#__PURE__*/React.createElement("form", {
    className: styles.wrapper,
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    className: styles.name__label
  }, `Name (${formState.name && formState.name.length || 0}/25)`), isOpen && /*#__PURE__*/React.createElement(Input, {
    name: "name",
    maxLength: "30",
    autoComplete: "off",
    className: styles.input,
    onChange: onInputChange,
    onBlur: onInputChange,
    isError: formState.error,
    errorText: formState.error,
    defaultValue: DUPLICATE_LABELS.includes(buttonLabel) ? undefined : formState.name,
    placeholder: 'For example, ' + placeholder
  }), /*#__PURE__*/React.createElement("button", {
    // hack for submiting form
    type: "submit",
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    className: styles.description__label
  }, "Description (optional)"), isOpen && /*#__PURE__*/React.createElement("textarea", {
    name: "description",
    className: styles.textarea,
    onChange: onTextareaChange,
    defaultValue: formState.description,
    placeholder: "Add a description"
  }), isOpen && type === 'PROJECT' && /*#__PURE__*/React.createElement(Assets, {
    watchlist: watchlist,
    preSelectedItems: preSelectedItems,
    onChange: listItems => {
      setFormState(state => _objectSpread(_objectSpread({}, state), {}, {
        listItems
      }));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Dialog.Approve, {
    className: styles.btn,
    accent: "positive",
    isLoading: isLoading,
    disabled: isLoading
  }, buttonLabel), /*#__PURE__*/React.createElement(PublicityToggle, {
    variant: "flat",
    isActive: formState.isPublic,
    onClick: onToggleClick,
    className: styles.toggle
  }))));
};

export default (_ref2 => {
  let {
    settings = {}
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(EditForm, _extends({}, props, {
    defaultSettings: _objectSpread({
      name: '',
      description: '',
      isPublic: true,
      listItems: props.watchlist ? props.watchlist.listItems : []
    }, settings)
  }));
});