import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';
import { removeTrigger } from '../../../ducks/Signals/common/actions';
import styles from './SignalControls.module.css';

const formatDescription = title => /*#__PURE__*/React.createElement("div", {
  className: styles.description
}, "Are you sure you want to delete ", title, "? This action cannot be undone.");

const RemoveSignalButton = ({
  id,
  signalTitle = 'trigger',
  removeSignal,
  redirect,
  className,
  withConfirm = true,
  trigger: TriggerEl = () => /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    type: "button",
    className: cx(className, styles.btn)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "remove"
  }))
}) => withConfirm ? /*#__PURE__*/React.createElement(ConfirmDialog, {
  id: id,
  title: "Do you want to delete this Alert?",
  description: formatDescription(signalTitle),
  onApprove: removeSignal,
  redirect: redirect,
  classes: styles,
  trigger: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TriggerEl, null))
}) : /*#__PURE__*/React.createElement(TriggerEl, {
  onClick: () => removeSignal(id)
});

const mapDispatchToProps = dispatch => ({
  removeSignal: id => {
    dispatch(removeTrigger(id));
  }
});

export default connect(null, mapDispatchToProps)(RemoveSignalButton);