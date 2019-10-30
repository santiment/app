import React, { PureComponent } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import styles from './EditableInput.module.scss'

class EditableInput extends PureComponent {
  state = { value: '', error: '' }

  onSubmit = () => {
    const { error, value } = this.state
    const { defaultValue, onSubmit } = this.props

    if (error || !value || value === defaultValue) {
      return
    }

    onSubmit(value)
  }

  onChange = ({ currentTarget: { value } }) => {
    this.setState({ value, error: this.props.validate(value) })
  }

  render () {
    const { error } = this.state
    const { label, defaultValue, isEmailConnected } = this.props
    return (
      <form className={styles.form} onSubmit={this.onBlur}>
        <Input
          icon='mail'
          iconPosition='left'
          className={styles.inputWrapper}
          inputClassName={cx(
            styles.input,
            isEmailConnected && styles.inputDisabled
          )}
          iconClassName={styles.inputIcon}
          placeholder={label}
          disabled={isEmailConnected}
          defaultValue={defaultValue}
          onChange={this.onChange}
          isError={error}
          onBlur={this.onSubmit}
        />
        {error && (
          <Label accent='persimmon' className={styles.error}>
            {error}
          </Label>
        )}
      </form>
    )
  }
}

export default EditableInput
