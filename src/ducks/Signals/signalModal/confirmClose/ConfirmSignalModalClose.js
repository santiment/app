import React from 'react'
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog'
import styles from './ConfirmSignalModalClose.module.scss'

const ConfirmSignalModalClose = ({ isOpen, onCancel, onApprove }) => (
  <ConfirmDialog
    isOpen={isOpen}
    title='Unsaved changes'
    confirmLabel='Confirm'
    description='Are you sure you want to out without saving?'
    onApprove={onApprove}
    onCancel={onCancel}
    classes={styles}
    trigger={<div />}
  />
)

export default ConfirmSignalModalClose
