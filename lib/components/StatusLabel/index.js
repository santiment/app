import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { DesktopOnly } from '../Responsive';
import styles from './StatusLabel.module.css';
const statusMap = [{
  icon: 'eye-disabled',
  label: 'Private'
}, {
  icon: 'eye',
  label: 'Public'
}];

const getStatus = isPublic => statusMap[Number(isPublic)] || statusMap[0];

const StatusLabel = ({
  isPublic = false,
  isFrozen = false,
  isPreview
}) => /*#__PURE__*/React.createElement("div", {
  className: cx('row v-center', isFrozen && styles.frozenStatus, isPreview && 'mrg-l mrg--r')
}, /*#__PURE__*/React.createElement(Icon, {
  type: getStatus(isPublic).icon,
  className: cx(styles.status, isPublic && styles.status_public, isPreview && styles.preview)
}), isPreview && /*#__PURE__*/React.createElement("span", {
  className: "mrg-s mrg--l body-2"
}, getStatus(isPublic).label), /*#__PURE__*/React.createElement(DesktopOnly, null, getStatus(isPublic).label));

export default StatusLabel;