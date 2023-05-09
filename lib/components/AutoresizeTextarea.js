import React, { Component } from 'react';
import PropTypes from 'prop-types';

const cb = _ => _;

class AutoresizeTextarea extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: (this.props.value || this.props.defaultValue).trim()
    };
    this.inputRef = /*#__PURE__*/React.createRef();

    this.onChange = ({
      currentTarget
    }) => {
      currentTarget.rows = this.getRowsCount(currentTarget.scrollHeight, this.textareaOneLineHeight);
      const {
        value
      } = currentTarget;
      this.setState({
        value
      }, () => this.props.onChange(value));
    };

    this.onBlur = ({
      currentTarget
    }) => {
      this.props.onBlur(currentTarget.value);
    };

    this.onKeyDown = e => {
      if (e.key === 'Enter' && this.props.blurOnEnter) {
        e.stopPropagation();
        e.preventDefault();

        if (this.inputRef) {
          this.inputRef.current.blur();
        }
      }
    };
  }

  componentDidMount() {
    const textarea = this.inputRef.current;
    const textareaOneLineHeight = textarea.clientHeight;
    textarea.rows = this.getRowsCount(textarea.scrollHeight, textareaOneLineHeight);
    this.textareaOneLineHeight = textareaOneLineHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      defaultValue: prevDefault
    } = prevProps;
    const {
      defaultValue,
      value: propsValue = '',
      isFormik
    } = this.props;

    if (isFormik) {
      if (defaultValue && defaultValue !== prevDefault) {
        this.setState({
          value: propsValue || defaultValue
        });
      } else {
        const {
          value: currentValue = ''
        } = this.state;

        if (currentValue !== propsValue && !propsValue) {
          this.setState({
            value: propsValue
          });
        }
      }
    }
  }

  getRowsCount(scrollHeight, textareaOneLineHeight) {
    const newRowsCount = Math.ceil(scrollHeight / textareaOneLineHeight);
    const {
      rowsCount
    } = this.props;
    return newRowsCount > rowsCount ? newRowsCount : rowsCount;
  }

  render() {
    const {
      value = ''
    } = this.state;
    const {
      className,
      placeholder,
      readOnly,
      rowsCount,
      maxLength,
      name
    } = this.props;
    return /*#__PURE__*/React.createElement("textarea", {
      readOnly: readOnly,
      className: className,
      placeholder: placeholder,
      rows: rowsCount,
      ref: this.inputRef,
      maxLength: maxLength,
      value: value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onBlur: this.onBlur,
      name: name
    });
  }

}

AutoresizeTextarea.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  blurOnEnter: PropTypes.bool
};
AutoresizeTextarea.defaultProps = {
  onChange: cb,
  onBlur: cb,
  defaultValue: '',
  className: '',
  placeholder: '',
  readOnly: false,
  rowsCount: 1
};
export default AutoresizeTextarea;