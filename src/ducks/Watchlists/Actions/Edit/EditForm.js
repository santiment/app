import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import Label from '@santiment-network/ui/Label'
import PublicityToggle from '../ChangeVisibility/Toggle'
import { useDebounce } from '../../../../hooks/index'
import styles from './EditForm.module.scss'

const MIN_LENGTH = 3
const SHORT_NAME_ERROR = `The name should be at least ${MIN_LENGTH} characters`
const BAD_SYMBOLS_ERROR = "Use only letters, numbers, whitespace and _-.'/,"
const NAME_EXISTS_ERROR = 'You has already use this name'
const ALLOWED_SYMBOLS_REGEXP = /^([.\-/_' ,\w]*)$/

const EditForm = ({
  buttonLabel = 'Save',
  isLoading,
  onFormSubmit,
  defaultSettings,
  open: isOpen,
  toggleOpen,
  id,
  type,
  lists = [],
  ...props
}) => {
  const [formState, setFormState] = useState(defaultSettings)
  const debouncedCheckName = useDebounce(checkName, 300)

  function onSubmit (evt) {
    evt.preventDefault()
    let err = ''

    const { name, description, isPublic, error } = formState

    if (!error) {
      err = checkName(name)
    }

    if (error || err) {
      return
    }

    if (
      name === defaultSettings.name &&
      description === defaultSettings.description &&
      isPublic === defaultSettings.isPublic &&
      id
    ) {
      toggleOpen(false)
    } else {
      onFormSubmit({ name, description, isPublic })
      setFormState({ ...defaultSettings })
    }
  }

  function onInputChange ({ currentTarget: { value: name } }) {
    setFormState(state => ({ ...state, name }))
    debouncedCheckName(name)
  }

  function onTextareaChange ({ currentTarget: { value: description } }) {
    setFormState(state => ({ ...state, description }))
  }

  function onToggleClick (evt) {
    evt.preventDefault()
    setFormState(state => ({ ...state, isPublic: !state.isPublic }))
  }

  function checkName (name = '') {
    let error = ''
    const hasSameName = lists.filter(
      list => list.name.toLowerCase() === name.toLowerCase()
    )

    if (!name || name.length < MIN_LENGTH) {
      error = SHORT_NAME_ERROR
    }

    if (!ALLOWED_SYMBOLS_REGEXP.test(name)) {
      error = BAD_SYMBOLS_ERROR
    }

    if (
      hasSameName.length > 0 &&
      !(hasSameName.length === 1 && hasSameName[0].id === id)
    ) {
      error = NAME_EXISTS_ERROR
    }

    setFormState(state => ({ ...state, error }))
    return error
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleOpen(false)}
      onOpen={() => {
        toggleOpen(true)
        setFormState({ ...defaultSettings })
      }}
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
          placeholder={`For example, ${
            type === 'watchlist' ? 'Favorites' : 'Most price performance'
          }`}
          maxLength='25'
          defaultValue={formState.name}
          onChange={onInputChange}
          isError={formState.error}
          errorText={formState.error}
          autoComplete='off'
        />
        <button
          // hack for submiting form
          type='submit'
          style={{ display: 'none' }}
        />
        <Label accent='waterloo' className={styles.description__label}>
          Description (optional)
        </Label>
        <textarea
          className={styles.textarea}
          name='description'
          defaultValue={formState.description || ''}
          onChange={onTextareaChange}
        />
        <div className={styles.actions}>
          <Dialog.Approve
            className={styles.btn}
            accent='positive'
            isLoading={isLoading}
            disabled={
              isLoading ||
              formState.error ||
              !formState.name ||
              formState.name.length < MIN_LENGTH
            }
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

export default ({ settings = {}, ...props }) => (
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
