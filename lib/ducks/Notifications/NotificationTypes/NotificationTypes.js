import React from 'react';
import cx from 'classnames';
import styles from './NotificationTypes.module.css';
const types = [{
  type: 'ALL',
  label: 'all'
}, {
  type: 'ALERT',
  label: 'alerts'
}, {
  type: 'INSIGHT',
  label: 'insights'
}];

const NotificationTypes = ({
  selected,
  onChange
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, types.map(({
    type,
    label
  }) => /*#__PURE__*/React.createElement("div", {
    key: type,
    className: cx(styles.label, selected === type && styles.label__selected),
    onClick: () => onChange(type)
  }, label)));
};

export default NotificationTypes;