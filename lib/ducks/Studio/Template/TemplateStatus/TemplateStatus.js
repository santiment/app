const _excluded = ["isAuthor", "isPublic", "toggleIsPublic", "asEl", "classes"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Toggle from '../../../../components/VisibilityIndicator/Toggle';
import styles from './TemplateStatus.module.css';
export const TemplateStatusToggle = ({
  toggleIsPublic,
  isPublic,
  classes = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    onClick: toggleIsPublic,
    className: classes.status
  }, "Public", /*#__PURE__*/React.createElement(Toggle, {
    isActive: isPublic,
    className: classes.toggle
  }));
};

const TemplateStatus = _ref => {
  let {
    isAuthor,
    isPublic,
    toggleIsPublic,
    asEl: El = 'div',
    classes = {}
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(El, _extends({
    className: cx(styles.publicity, isPublic && styles.publicity_public, !isAuthor && styles.unclickable, classes.status),
    onClick: isAuthor ? toggleIsPublic : undefined
  }, rest), /*#__PURE__*/React.createElement(Icon, {
    type: isPublic ? 'eye' : 'eye-disabled',
    className: cx(styles.icon, classes.statusIcon, !isAuthor && styles.unclickableIcon)
  }), ' ', isPublic ? 'Public' : 'Private');
};

export default TemplateStatus;