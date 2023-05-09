const _excluded = ["template", "isLoggedIn", "saveTemplate", "onNewTemplate"],
      _excluded2 = ["forwardedRef", "selectedTemplate", "isMenuOpened", "openMenu", "onNewTemplate"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import FormDialogNewTemplate from './Dialog/NewTemplate';
import styles from './index.module.css';
import btnStyles from './Button.module.css';

const SaveAction = _ref => {
  let {
    template,
    isLoggedIn,
    saveTemplate,
    onNewTemplate
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const onActionClick = template && isLoggedIn ? saveTemplate : openDialog;
  const actionComponent = /*#__PURE__*/React.createElement("span", {
    className: cx(btnStyles.action, btnStyles.save),
    onClick: onActionClick
  }, "Save", template ? '' : ' as');

  function openDialog() {
    setIsDialogOpened(true);
  }

  function closeDialog() {
    setIsDialogOpened(false);
  }

  function onNew(template) {
    onNewTemplate(template);
    closeDialog();
  }

  if (template && isLoggedIn) {
    return actionComponent;
  }

  return /*#__PURE__*/React.createElement(FormDialogNewTemplate, _extends({}, props, {
    title: "New Chart Layout",
    open: isDialogOpened,
    onClose: closeDialog,
    onNew: onNew,
    trigger: actionComponent
  }));
};

export default (_ref2 => {
  let {
    forwardedRef,
    selectedTemplate,
    isMenuOpened,
    openMenu,
    onNewTemplate
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement("div", {
    className: btnStyles.btn,
    ref: forwardedRef
  }, /*#__PURE__*/React.createElement(SaveAction, _extends({}, props, {
    template: selectedTemplate,
    onNewTemplate: onNewTemplate
  })), /*#__PURE__*/React.createElement("span", {
    className: btnStyles.action,
    onClick: openMenu
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-down",
    className: cx(btnStyles.arrow, isMenuOpened && styles.active)
  })));
});