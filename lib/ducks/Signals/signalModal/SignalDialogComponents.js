import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import EmptySection from '../../../components/EmptySection/EmptySection';
import styles from './SignalMasterModalForm.module.css';
export const TriggerModalTitle = ({
  showSharedBtn,
  isError,
  dialogTitle = 'Alert details',
  isLoggedIn
}) => {
  if (isError) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, dialogTitle, showSharedBtn && isLoggedIn && /*#__PURE__*/React.createElement(Button, {
    accent: "positive",
    variant: "fill",
    className: styles.shared
  }, "Shared"));
};
export const signalModalTrigger = (enabled, label, variant = 'fill', border = false, classes) => /*#__PURE__*/React.createElement(Button, {
  variant: variant,
  border: border,
  disabled: !enabled,
  accent: "positive",
  className: cx(styles.newSignal, classes)
}, label);
export const NoSignal = () => /*#__PURE__*/React.createElement(EmptySection, {
  className: styles.notSignalInfo
}, "Alert doesn't exist", /*#__PURE__*/React.createElement("br", null), "or it's a private alert.");