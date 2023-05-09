function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import { PanelWithHeader as Panel } from '@santiment-network/ui';
import styles from './AccountPage.module.css';

const Settings = props => /*#__PURE__*/React.createElement(Panel, _extends({}, props, {
  className: cx(styles.settings, props.className),
  headerClassName: cx(styles.settings__header, 'txt-m body-3'),
  contentClassName: cx(styles.settings__content, props.contentClassName)
}));

Settings.Row = props => /*#__PURE__*/React.createElement("div", _extends({
  className: cx(styles.setting, props.className)
}, props));

export default Settings;