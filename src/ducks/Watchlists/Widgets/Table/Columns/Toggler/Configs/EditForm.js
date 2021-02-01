import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import Label from '@santiment-network/ui/Label'
import { useDebounce } from '../../../../../../../hooks/index'
import { upperCaseFirstLetter } from '../../../../../../../utils/formatting'
import styles from './EditForm.module.scss'

const MIN_LENGTH = 3
const SHORT_NAME_ERROR = `The name should be at least ${MIN_LENGTH} characters`
const BAD_SYMBOLS_ERROR = "Use only letters, numbers, whitespace and _-.'/,"
const NAME_EXISTS_ERROR = 'You has already use this name'
const ALLOWED_SYMBOLS_REGEXP = /^([.\-/_' ,\w]*)$/

const EMPTY_ARRAY = []

const EditForm = ({
  buttonLabel,
  isLoading,
  onFormSubmit,
  name: defaultName,
  open: isOpen,
  toggleOpen,
  id,
  sets,
  ...props
}) => {
  const [formState, setFormState] = useState({ name: defaultName })
  const debouncedCheckName = useDebounce(checkName, 300)

  function onSubmit (evt) {
    evt.preventDefault()

    const { name, error } = formState

    if (!error) {
      checkName(name)
    }

    if (error) {
      return
    }

    if (name === defaultName) {
      toggleOpen(false)
    } else {
      onFormSubmit(upperCaseFirstLetter(name))
    }
  }

  function onInputChange ({ currentTarget: { value: name } }) {
    setFormState(state => ({ ...state, name }))
    debouncedCheckName(name)
  }

  function checkName (name = '') {
    let error = ''
    const hasSameName = sets.filter(
      set => set.title.toLowerCase() === name.toLowerCase()
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
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        toggleOpen(false)
        setFormState({ name: defaultName })
      }}
      onOpen={() => {
        toggleOpen(true)
        setFormState({ name: defaultName })
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
          placeholder='For example, Social movements'
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
          <Dialog.Cancel className={styles.btn}>Cancel</Dialog.Cancel>
        </div>
      </form>
    </Dialog>
  )
}

EditForm.defaultProps = {
  name: '',
  sets: EMPTY_ARRAY
}

export default EditForm
