import React from 'react';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';
import styles from './ConfirmClose.module.css';

const ConfirmClose = ({
  isOpen,
  onCancel,
  onApprove
}) => /*#__PURE__*/React.createElement(ConfirmDialog, {
  isOpen: isOpen,
  title: "Unsaved changes",
  confirmLabel: "Confirm",
  description: "Are you sure you want to quit without saving?",
  onApprove: onApprove,
  onCancel: onCancel,
  classes: styles,
  trigger: /*#__PURE__*/React.createElement("div", null)
});

export default ConfirmClose;