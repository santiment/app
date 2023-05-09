function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Label from '@santiment-network/ui/Label';
import Input from '@santiment-network/ui/Input';
import Icon from '@santiment-network/ui/Icon';
import DarkTooltip from '../../components/Tooltip/DarkTooltip';
import styles from './AccountPage.module.css';

class EditableInputSetting extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      value: '',
      editing: false,
      error: ''
    };
    this.inputRef = /*#__PURE__*/React.createRef();

    this.onSubmit = e => {
      e.preventDefault();
      e.stopPropagation();
      const {
        editing,
        error,
        value
      } = this.state;

      if (!editing || error) {
        return;
      }

      const {
        defaultValue,
        onSubmit
      } = this.props;

      if (value === defaultValue) {
        this.disableEditing();
        return;
      }

      onSubmit(value, this.disableEditing);
    };

    this.disableEditing = () => {
      this.props.clearError && this.props.clearError();
      this.setState({
        editing: false,
        value: '',
        error: ''
      });
    };

    this.onEditClick = () => {
      this.setState({
        editing: true,
        value: this.props.defaultValue
      });
      this.inputRef && this.inputRef.current.focus();
    };

    this.onChangeDebounced = ({
      currentTarget: {
        value
      }
    }) => {
      this.onChange(value);
    };
  }

  onChange(value) {
    const error = this.props.validate(value);
    this.setState({
      value,
      error
    });
  }

  render() {
    const {
      editing,
      error,
      value
    } = this.state;
    const {
      label,
      defaultValue,
      classes = {},
      prefix,
      tooltip,
      saving = false,
      submitError
    } = this.props;

    if (submitError) {
      this.setState(state => _objectSpread(_objectSpread({}, state), {}, {
        error: submitError
      }));
    }

    return /*#__PURE__*/React.createElement("form", {
      className: cx(styles.setting, styles.form, classes.inputContainer, error && styles.form_error),
      onSubmit: this.onSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(styles.setting__left, styles.inputBlock, classes.inputContainerLeft, editing && styles.setting__left_form)
    }, !editing && /*#__PURE__*/React.createElement("div", {
      className: cx(classes.inputLabels, styles.inputLabels)
    }, /*#__PURE__*/React.createElement(Label, {
      className: styles.label
    }, tooltip ? /*#__PURE__*/React.createElement(DarkTooltip, {
      trigger: /*#__PURE__*/React.createElement("div", {
        className: "row hv-center"
      }, label, " ", /*#__PURE__*/React.createElement(Icon, {
        type: "info-round",
        className: styles.labelTooltip
      })),
      position: "top",
      align: "start"
    }, tooltip) : label), /*#__PURE__*/React.createElement(Label, {
      className: cx(styles.label, styles.setting__description, classes.inputContainerLabel),
      accent: "waterloo"
    }, defaultValue && `${prefix || ''}${defaultValue}` || `Please add your ${label.toLowerCase()}`)), editing && !!prefix && /*#__PURE__*/React.createElement("div", {
      className: styles.prefix
    }, prefix), /*#__PURE__*/React.createElement(Input, {
      forwardedRef: this.inputRef,
      className: cx(styles.form__input, editing && styles.form__input_edit, !!prefix && styles.form__input_prefix),
      defaultValue: defaultValue,
      value: value,
      onChange: this.onChangeDebounced,
      isError: error,
      errorText: error,
      disabled: saving
    })), /*#__PURE__*/React.createElement("div", {
      className: classes.inputContainerRight
    }, editing ? /*#__PURE__*/React.createElement("div", {
      className: styles.btns
    }, /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: cx(styles.btn, styles.btn_cancel),
      onClick: this.disableEditing,
      disabled: saving
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "fill",
      accent: "positive",
      className: styles.btn,
      type: "submit",
      disabled: saving
    }, "Save")) : /*#__PURE__*/React.createElement(Label, {
      className: styles.form__action,
      accent: "jungle-green",
      onClick: this.onEditClick
    }, defaultValue ? 'Edit' : 'Add', " ", label.toLowerCase())));
  }

}

export default EditableInputSetting;