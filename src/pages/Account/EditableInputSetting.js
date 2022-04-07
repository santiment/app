import React, { PureComponent } from 'react'
import Button from '@santiment-network/ui/Button'
import Label from '@santiment-network/ui/Label'
import Input from '@santiment-network/ui/Input'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../components/Tooltip/DarkTooltip'
import cx from 'classnames'
import styles from './AccountPage.module.scss'

class EditableInputSetting extends PureComponent {
  state = {
    value: '',
    editing: false,
    error: '',
  }

  inputRef = React.createRef()

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  onSubmit = (e) => {
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

    onSubmit(value, this.disableEditing)
  }

  disableEditing = () => {
    this.props.clearError && this.props.clearError()
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
    const { editing, error, value } = this.state
    const {
      label,
      defaultValue,
      classes = {},
      prefix,
      tooltip,
      saving = false,
      submitError,
    } = this.props

    if (submitError) {
      this.setState((state) => ({ ...state, error: submitError }))
    }

    return (
      <form
        className={cx(
          styles.setting,
          styles.form,
          classes.inputContainer,
          error && styles.form_error,
        )}
        onSubmit={this.onSubmit}
      >
        <div
          className={cx(
            styles.setting__left,
            styles.inputBlock,
            classes.inputContainerLeft,
            editing && styles.setting__left_form,
          )}
        >
          {!editing && (
            <div className={cx(classes.inputLabels, styles.inputLabels)}>
              <Label className={styles.label}>
                {tooltip ? (
                  <DarkTooltip
                    trigger={
                      <div>
                        {label} <Icon type='info-round' className={styles.labelTooltip} />
                      </div>
                    }
                    position='top'
                    align='start'
                  >
                    {tooltip}
                  </DarkTooltip>
                ) : (
                  label
                )}
              </Label>
              <Label
                className={cx(styles.setting__description, classes.inputContainerLabel)}
                accent='waterloo'
              >
                {(defaultValue && `${prefix || ''}${defaultValue}`) ||
                  `Please add your ${label.toLowerCase()}`}
              </Label>
            </div>
          )}
          {editing && !!prefix && <div className={styles.prefix}>{prefix}</div>}
          <Input
            forwardedRef={this.inputRef}
            className={cx(
              styles.form__input,
              editing && styles.form__input_edit,
              !!prefix && styles.form__input_prefix,
            )}
            defaultValue={defaultValue}
            value={value}
            onChange={this.onChangeDebounced}
            isError={error}
            errorText={error}
            disabled={saving}
          />
        </div>

        <div className={classes.inputContainerRight}>
          {editing ? (
            <div className={styles.btns}>
              <Button
                variant='fill'
                accent='positive'
                className={styles.btn}
                type='submit'
                disabled={saving}
              >
                Save
              </Button>
              <Button
                border
                className={cx(styles.btn, styles.btn_cancel)}
                onClick={this.disableEditing}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Label className={styles.form__action} accent='jungle-green' onClick={this.onEditClick}>
              {defaultValue ? 'Edit' : 'Add'} {label.toLowerCase()}
            </Label>
          )}
        </div>
      </form>
    )
  }
}

export default EditableInputSetting
