function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import styles from '../Dialog/LoadTemplate/Template.module.css';

const Option = props => /*#__PURE__*/React.createElement(Button, _extends({}, props, {
  fluid: true,
  variant: "ghost",
  className: cx(styles.option, props.className)
}));

export default Option;