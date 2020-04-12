import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import styles from './DialogForm.module.scss'

export default ({
  placeholder,
  buttonLabel,
  defaultValue,
  onFormSubmit,
  ...props
}) => {
  function onSubmit (e) {
    e.preventDefault()
    onFormSubmit(e.currentTarget.templateName.value)
  }

  return (
    <Dialog {...props} classes={styles}>
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <Input
          autoFocus
          required
          name='templateName'
          className={styles.input}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        <Dialog.Approve className={styles.btn} accent='positive'>
          {buttonLabel}
        </Dialog.Approve>
      </form>
    </Dialog>
  )
}
