const _excluded = ["children", "iconClassName", "title", "dialogClasses"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Dialog from '@santiment-network/ui/Dialog';

const FullscreenDialogBtn = _ref => {
  let {
    children,
    iconClassName,
    title,
    dialogClasses
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Dialog, {
    title: title,
    classes: dialogClasses,
    trigger: /*#__PURE__*/React.createElement(Button, rest, /*#__PURE__*/React.createElement(Icon, {
      type: "fullscreen",
      className: iconClassName
    }))
  }, children);
};

export default FullscreenDialogBtn;