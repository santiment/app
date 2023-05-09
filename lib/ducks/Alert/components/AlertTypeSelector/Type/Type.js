import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import styles from './Type.module.css';

const Type = ({
  iconType,
  title,
  description,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, 'column'),
  onClick: onClick
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.title, 'row v-center body-1 c-black')
}, /*#__PURE__*/React.createElement(Icon, {
  type: iconType,
  className: styles.icon
}), title), /*#__PURE__*/React.createElement("div", {
  className: cx(styles.description, 'body-3')
}, description));

export default Type;