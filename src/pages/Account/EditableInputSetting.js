import React, { PureComponent } from 'react'
import {
  Panel,
  Input,
  Tabs,
  Toggle,
  Label,
  Button,
  Selector
} from '@santiment-network/ui'
import cx from 'classnames'
import styles from './AccountPage.module.scss'

class EditableInputSetting extends PureComponent {
  state = {
    value: '',
    editing: false,
    defaultValue: this.props.defaultValue,
    error: ''
  }

  componentWilllUnmout () {
    clearTimeout(this.timeout)
  }

  onSubmit = e => {
    e.preventDefault()
    const { editing, error, value } = this.state
    if (!editing || error) {
      return
    }

    this.props.onSubmit(value)
  }

  disableEditing = () => {
    this.setState({ editing: false, value: '', error: '' })
  }

  onEditClick = () => {
    this.setState({ editing: true })
  }

  onChange (value) {
    const error = this.props.validate(value)
    this.setState({ value, error })
  }

  onChangeDebounced = ({ currentTarget: { value } }) => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.onChange(value), 300)
  }

  render () {
    const { defaultValue, editing, error } = this.state
    const { label } = this.props
    return (
      <form
        style={{ height: 70 }}
        className={cx(styles.setting, styles.form, error && styles.form_error)}
        onSubmit={this.onSubmit}
      >
        <div
          className={cx(
            styles.setting__left,
            editing && styles.setting__left_form
          )}
        >
          <Label>{label}</Label>
          {!editing && (
            <Label className={styles.setting__description} accent='waterloo'>
              {defaultValue || `Please add your ${label.toLowerCase()}`}
            </Label>
          )}
          {editing && (
            <Input
              className={styles.form__input}
              defaultValue={defaultValue}
              onChange={this.onChangeDebounced}
              isError={error}
            />
          )}
          <Panel padding className={styles.form__error}>
            <Label accent='persimmon'>{error}</Label>
          </Panel>
        </div>

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
            {defaultValue ? 'Change' : 'Add'} your {label.toLowerCase()}
          </Label>
        )}
      </form>
    )
  }
}

export default EditableInputSetting
