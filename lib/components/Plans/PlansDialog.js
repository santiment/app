import React, { useState } from 'react';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import Plans from './Plans';
import styles from './PlansDialog.module.css';

const PlansDialog = ({
  subscription
}) => {
  const [opened, setOpened] = useState(false);

  function closeDialog() {
    setOpened(false);
  }

  function openDialog() {
    setOpened(true);
  }

  return /*#__PURE__*/React.createElement(Dialog, {
    open: opened,
    title: "Existing plans",
    classes: styles,
    onClose: closeDialog,
    trigger: /*#__PURE__*/React.createElement(Button, {
      accent: "positive",
      variant: "fill",
      onClick: openDialog
    }, subscription ? 'Change' : 'Upgrade', " plan")
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, null, /*#__PURE__*/React.createElement(Plans, {
    classes: styles,
    onDialogClose: closeDialog
  })));
};

export default PlansDialog;