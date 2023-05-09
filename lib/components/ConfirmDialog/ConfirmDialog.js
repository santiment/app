const _excluded = ["dialog", "dialogTitle"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { PureComponent } from 'react';
import cx from 'classnames';
import Dialog from '@santiment-network/ui/Dialog';
import styles from './ConfirmDialog.module.css';

class ConfirmDialog extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };

    this.openDialog = () => {
      this.setState({
        open: true
      });
    };

    this.onClose = () => {
      const {
        onCancel
      } = this.props;
      this.closeDialog();
      onCancel && onCancel();
    };

    this.closeDialog = () => {
      this.setState({
        open: false
      });
    };

    this.onDeleteClick = () => {
      const {
        id,
        onApprove,
        redirect,
        name
      } = this.props;
      onApprove(id, name);

      if (redirect) {
        redirect();
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      isOpen
    } = nextProps;

    if (typeof isOpen === 'undefined') {
      return null;
    }

    return {
      open: isOpen
    };
  }

  render() {
    const {
      title,
      description,
      trigger,
      classes,
      confirmLabel,
      isLoading
    } = this.props;

    const {
      dialog,
      dialogTitle
    } = classes,
          restClasses = _objectWithoutProperties(classes, _excluded);

    return /*#__PURE__*/React.createElement(Dialog, {
      open: this.state.open,
      onClose: this.onClose,
      onOpen: this.openDialog,
      trigger: trigger,
      classes: _objectSpread({
        dialog: cx(styles.dialog, 'box', dialog),
        title: cx('h4 txt-m c-black mrg--b mrg-s', dialogTitle)
      }, restClasses)
    }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
      withPadding: true,
      className: styles.content
    }, title && /*#__PURE__*/React.createElement("div", {
      className: "row hv-center h4 txt-m mrg--b mrg-s c-black"
    }, title), description && /*#__PURE__*/React.createElement("div", {
      className: "column hv-center body-2 c-waterloo"
    }, description)), /*#__PURE__*/React.createElement(Dialog.Actions, {
      className: cx(styles.actions, 'row hv-center mrg--b')
    }, /*#__PURE__*/React.createElement(Dialog.Approve, {
      className: cx(styles.button, 'btn-1 btn--green c-white'),
      onClick: this.onDeleteClick,
      isLoading: isLoading
    }, confirmLabel), /*#__PURE__*/React.createElement(Dialog.Cancel, {
      onClick: this.onClose,
      className: cx(styles.button, 'btn-2'),
      isLoading: isLoading
    }, "Cancel")));
  }

}

ConfirmDialog.defaultProps = {
  title: 'Do you want to delete this watchlist?',
  description: 'Are you sure? This action cannot be undone.',
  confirmLabel: 'Delete',
  classes: {}
};
export default ConfirmDialog;