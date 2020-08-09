import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import AutoresizeTextarea from '../../../../components/AutoresizeTextarea'
// import LoginDialogWrapper from '../../../../components/LoginDialog/LoginDialogWrapper'
import PublicityToggle from '../ChangeVisibility'
import styles from './EditForm.module.scss'

const EditForm = ({
  placeholders = {
    name: '',
    description: ''
  },
  buttonLabel = 'Save',
  defaultValue,
  isLoading,
  onFormSubmit,
  description = '',
  actions,
  watchlist,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)

  function onSubmit (e) {
    e.preventDefault()
    onFormSubmit({
      title: e.currentTarget.name.value,
      description: e.currentTarget.description.value
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      {...props}
      classes={styles}
    >
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <Input
          autoFocus
          required
          name='name'
          className={styles.input}
          placeholder={placeholders.name}
          defaultValue={defaultValue}
        />
        <AutoresizeTextarea
          className={styles.textarea}
          placeholder={placeholders.description}
          name='description'
          defaultValue={description || ''}
        />

        <div className={styles.actions}>
          <Dialog.Approve
            className={styles.btn}
            accent='positive'
            isLoading={isLoading}
          >
            {buttonLabel}
          </Dialog.Approve>
          <PublicityToggle
            variant='flat'
            watchlist={watchlist}
            className={styles.toggle}
          />
        </div>
      </form>
    </Dialog>
  )
}

export default EditForm
