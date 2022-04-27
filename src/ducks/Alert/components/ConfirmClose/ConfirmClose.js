import React from 'react'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'
import styles from './ConfirmClose.module.scss'

const ConfirmClose = ({ isOpen, onCancel, onApprove }) => (
  <ConfirmDialog
    isOpen={isOpen}
    title='Unsaved changes'
    confirmLabel='Confirm'
    description='Are you sure you want to quit without saving?'
    onApprove={onApprove}
    onCancel={onCancel}
    classes={styles}
    trigger={<div />}
  />
)

export default ConfirmClose
