import React from 'react'
import cx from 'classnames'
import ConfirmDialog from '../../../../../components/ConfirmDialog/ConfirmDialog'
import Option from '../../TemplateContextMenu/Option'
import { useDeleteTemplate } from '../../gql/hooks'
import styles from './DeleteTemplate.module.scss'

const DeleteTemplate = ({ isAuthor, onDelete, template, closeMenu, className }) => {
  if (!isAuthor) {
    return null
  }

  const [deleteTemplate, loading] = useDeleteTemplate()

  return (
    <ConfirmDialog
      title='Do you want to delete this template?'
      trigger={<Option className={cx(styles.delete, className)}>Delete</Option>}
      onApprove={() => {
        deleteTemplate(template, onDelete).then(closeMenu)
      }}
      onCancel={closeMenu}
      isLoading={loading}
    />
  )
}

export default DeleteTemplate
