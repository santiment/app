import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import Label from '@santiment-network/ui/Label'
import AutoresizeTextarea from '../../../../components/AutoresizeTextarea'
// import LoginDialogWrapper from '../../../../components/LoginDialog/LoginDialogWrapper'
import PublicityToggle from '../ChangeVisibility/Toggle'
import { useDebounce } from '../../../../hooks/index'
import styles from './EditForm.module.scss'

const MIN_LENGTH = 3
const SHORT_NAME_ERROR = `The name should be at least ${MIN_LENGTH} characters`
const BAD_SYMBOLS_ERROR = "Use only letters, numbers, whitespace and _-.'/,"
const ALLOWED_SYMBOLS_REGEXP = /^([.\-/_' ,\w]*)$/

const EditForm = ({
  buttonLabel = 'Save',
  isLoading,
  onFormSubmit,
  defaultSettings,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)
  const [formState, setFormState] = useState({ ...defaultSettings })
  const debouncedCheckName = useDebounce(checkName, 300)

  function onSubmit (evt) {
    evt.preventDefault()

    const { name, description, isPublic, error } = formState

    if (!error) {
      checkName(name)
    }

    // onFormSubmit({ name, description, isPublic })
  }

  function onInputChange ({ currentTarget: { value: name } }) {
    setFormState(state => ({ ...state, name }))
    debouncedCheckName(name)
  }

  function onToggleClick (evt) {
    evt.preventDefault()
    setFormState(state => ({ ...state, isPublic: !state.isPublic }))
  }

  function checkName (name) {
    let error = ''

    if (!name || name.length < MIN_LENGTH) {
      error = SHORT_NAME_ERROR
    }

    if (!ALLOWED_SYMBOLS_REGEXP.test(name)) {
      error = BAD_SYMBOLS_ERROR
    }
    setFormState(state => ({ ...state, error }))
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
        <Label accent='waterloo' className={styles.name__label}>
          {`Name (${formState.name.length}/25)`}
        </Label>
        <Input
          autoFocus
          name='name'
          className={styles.input}
          placeholder='For example, Most price performance'
          maxLength='25'
          defaultValue={formState.name}
          onChange={onInputChange}
          isError={formState.error}
        />
        <button
          // hack for submiting form
          type='submit'
          style={{ display: 'none' }}
        />
        <Label accent='persimmon' className={styles.error}>
          {formState.error ? formState.error : ''}
        </Label>
        <Label accent='waterloo' className={styles.description__label}>
          Description (optional)
        </Label>
        <AutoresizeTextarea
          className={styles.textarea}
          name='description'
          defaultValue={formState.description || ''}
        />
        <div className={styles.actions}>
          <Dialog.Approve
            className={styles.btn}
            accent='positive'
            isLoading={isLoading}
            disabled={isLoading || formState.error}
          >
            {buttonLabel}
          </Dialog.Approve>
          <PublicityToggle
            variant='flat'
            isActive={formState.isPublic}
            onClick={onToggleClick}
            className={styles.toggle}
          />
        </div>
      </form>
    </Dialog>
  )
}

export default ({ settings, ...props }) => (
  <EditForm
    {...props}
    defaultSettings={{
      name: '',
      description: '',
      isPublic: false,
      ...settings
    }}
  />
)
