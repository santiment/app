import React, { PureComponent } from 'react'
import { Panel, Input, Label, Button } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './AccountPage.module.scss'

class EditableInputSetting extends PureComponent {
  state = {
    value: '',
    editing: false,
    error: ''
  }

  inputRef = React.createRef()

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  onSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    const { editing, error, value } = this.state
    if (!editing || error) {
      return
    }

    const { defaultValue, onSubmit } = this.props

    if (value === defaultValue) {
      this.disableEditing()
      return
    }

    this.disableEditing()
    onSubmit(value)
  }

  disableEditing = () => {
    this.setState({ editing: false, value: '', error: '' })
  }

  onEditClick = () => {
    this.setState({ editing: true, value: this.props.defaultValue })
    this.inputRef && this.inputRef.current.focus()
  }

  onChange (value) {
    const error = this.props.validate(value)
    this.setState({ value, error })
  }

  onChangeDebounced = ({ currentTarget: { value } }) => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.onChange(value), 100)
  }

  render () {
    const { editing, error } = this.state
    const { label, defaultValue, classes = {} } = this.props
    return (
      <form
        className={cx(
          styles.setting,
          styles.form,
          classes.inputContainer,
          error && styles.form_error
        )}
        onSubmit={this.onSubmit}
      >
        <div
          className={cx(
            styles.setting__left,
            styles.inputBlock,
            classes.inputContainerLeft,
            editing && styles.setting__left_form
          )}
        >
          {!editing && (
            <div className={cx(classes.inputLabels, styles.inputLabels)}>
              <Label>{label}</Label>
              <Label
                className={cx(
                  styles.setting__description,
                  classes.inputContainerLabel
                )}
                accent='waterloo'
              >
                {defaultValue || `Please add your ${label.toLowerCase()}`}
              </Label>
            </div>
          )}
          <Input
            forwardedRef={this.inputRef}
            className={cx(
              styles.form__input,
              editing && styles.form__input_edit
            )}
            defaultValue={defaultValue}
            onChange={this.onChangeDebounced}
            isError={error}
          />
          <Panel padding className={styles.form__error}>
            <Label accent='persimmon'>{error}</Label>
          </Panel>
        </div>

        <div className={classes.inputContainerRight}>
          {editing ? (
            <div className={styles.btns}>
              <Button
                variant='fill'
                accent='positive'
                className={styles.btn}
                type='submit'
              >
                Save
              </Button>
              <Button
                border
                className={cx(styles.btn, styles.btn_cancel)}
                onClick={this.disableEditing}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Label
              className={styles.form__action}
              accent='jungle-green'
              onClick={this.onEditClick}
            >
              {defaultValue ? 'Edit' : 'Add'} {label.toLowerCase()}
            </Label>
          )}
        </div>
      </form>
    )
  }
}

export default EditableInputSetting
