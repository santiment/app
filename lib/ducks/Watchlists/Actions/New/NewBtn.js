function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import styles from './NewBtn.module.css';

const NewBtn = props => /*#__PURE__*/React.createElement(Button, _extends({
  className: cx(styles.button, props.className)
}, props), /*#__PURE__*/React.createElement(Icon, {
  type: "plus-round",
  className: styles.icon
}), "Create watchlist");

export default NewBtn;