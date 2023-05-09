const _excluded = ["className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '@santiment-network/ui/Tooltip';
import Panel from '@santiment-network/ui/Panel';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './HelpPopup.module.css';
export const HelpPopupTrigger = _ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Icon, _extends({}, props, {
    className: cx(styles.trigger, className),
    type: "info-round"
  }));
};

const HelpPopup = ({
  children,
  content,
  className,
  position = 'bottom',
  align = 'center',
  on = 'click',
  trigger: Trigger = HelpPopupTrigger,
  isPhone,
  triggerClassName
}) => {
  const render = content || children;
  return isPhone ? /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(Trigger, {
      className: triggerClassName
    })
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, render)) : /*#__PURE__*/React.createElement(Tooltip, {
    trigger: /*#__PURE__*/React.createElement(Trigger, {
      className: triggerClassName
    }),
    position: position,
    align: align,
    on: on,
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, render));
};

export default withSizes(mapSizesToProps)(HelpPopup);