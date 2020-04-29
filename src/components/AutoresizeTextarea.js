import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutoresizeTextarea extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => {},
    defaultValue: '',
    className: '',
    placeholder: '',
    readOnly: false,
    rowsCount: 1
  }

  state = {
    value: (this.props.value || this.props.defaultValue).trim()
  }

  inputRef = React.createRef()

  componentDidMount () {
    const textarea = this.inputRef.current
    const textareaOneLineHeight = textarea.clientHeight

    textarea.rows = this.getRowsCount(
      textarea.scrollHeight,
      textareaOneLineHeight
    )
    this.textareaOneLineHeight = textareaOneLineHeight
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { defaultValue: prevDefault } = prevProps
    const { defaultValue, value: propsValue = '', isFormik } = this.props

    if (isFormik) {
      if (defaultValue && defaultValue !== prevDefault) {
        this.setState({
          value: propsValue || defaultValue
        })
      } else {
        const { value: currentValue = '' } = this.state
        if (currentValue !== propsValue && !propsValue) {
          this.setState({
            value: propsValue
          })
        }
      }
    }
  }

  getRowsCount (scrollHeight, textareaOneLineHeight) {
    const newRowsCount = Math.ceil(scrollHeight / textareaOneLineHeight)
    const { rowsCount } = this.props
    return newRowsCount > rowsCount ? newRowsCount : rowsCount
  }

  onChange = ({ currentTarget }) => {
    currentTarget.rows = this.getRowsCount(
      currentTarget.scrollHeight,
      this.textareaOneLineHeight
    )

    const { value } = currentTarget

    this.setState(
      {
        value
      },
      () => this.props.onChange(value)
    )
  }

  render () {
    const { value = '' } = this.state
    const {
      className,
      placeholder,
      readOnly,
      rowsCount,
      maxLength,
      name
    } = this.props

    return (
      <textarea
        readOnly={readOnly}
        className={className}
        placeholder={placeholder}
        rows={rowsCount}
        ref={this.inputRef}
        maxLength={maxLength}
        value={value}
        onChange={this.onChange}
        name={name}
      />
    )
  }
}

export default AutoresizeTextarea
