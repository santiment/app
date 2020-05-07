import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import AutoresizeTextarea from '../../../../components/AutoresizeTextarea'
import LoginDialogWrapper from '../../../../components/LoginDialog/LoginDialogWrapper'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import styles from './DialogForm.module.scss'

const DialogForm = ({
  placeholders = {
    title: 'Name of the template...',
    description: 'Description'
  },
  buttonLabel,
  defaultValue,
  isLoading,
  onFormSubmit,
  description = '',
  isLoggedIn,
  actions,
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

  if (!isLoggedIn) {
    return <LoginDialogWrapper>{props.trigger}</LoginDialogWrapper>
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true)
      }}
      {...props}
      classes={styles}
    >
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <Input
          autoFocus
          required
          name='name'
          className={styles.input}
          placeholder={placeholders.title}
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
          {actions}
        </div>
      </form>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(DialogForm)
