import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutoresizeTextarea extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    onChange: () => {},
    defaultValue: '',
    className: '',
    placeholder: ''
  }

  state = {
    value: this.props.defaultValue
  }

  inputRef = React.createRef()

  componentDidMount () {
    this.titleOneLineHeight = this.inputRef.current.clientHeight
  }

  onChange = ({ currentTarget }) => {
    currentTarget.rows = 1
    currentTarget.rows = currentTarget.scrollHeight / this.titleOneLineHeight

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
    const { className, placeholder } = this.props

    return (
      <textarea
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
