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
    readOnly: false
  }

  state = {
    value: this.props.defaultValue.trim()
  }

  inputRef = React.createRef()

  componentDidMount () {
    const textarea = this.inputRef.current
    const textareaOneLineHeight = textarea.clientHeight

    textarea.rows = Math.ceil(textarea.scrollHeight / textareaOneLineHeight)
    this.textareaOneLineHeight = textareaOneLineHeight
  }

  onChange = ({ currentTarget }) => {
    currentTarget.rows = 1
    currentTarget.rows = Math.ceil(
      currentTarget.scrollHeight / this.textareaOneLineHeight
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
    const { value } = this.state
    const { className, placeholder, readOnly } = this.props

    return (
      <textarea
        readOnly={readOnly}
        className={className}
        placeholder={placeholder}
        rows='1'
        ref={this.inputRef}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}

export default AutoresizeTextarea
