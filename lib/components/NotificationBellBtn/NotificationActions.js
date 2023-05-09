import React from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Panel from '@santiment-network/ui/Panel';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { useDialogState } from '../../hooks/dialog';
import { useIsInFollowers, useNotificationToggle } from './hooks';
import styles from './NotificationActions.module.css';

const NotificationActions = ({
  data,
  className
}) => {
  const {
    user
  } = data;
  const {
    isOpened,
    openDialog,
    closeDialog
  } = useDialogState();
  const isInFollowersList = useIsInFollowers(user.id);

  if (!isInFollowersList) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ContextMenu, {
    onOpen: openDialog,
    onClose: closeDialog,
    open: isOpened,
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.expand, className),
      variant: "ghost",
      onClick: e => {
        e.stopPropagation();
        openDialog();
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "dots",
      className: styles.expand__icon
    })),
    passOpenStateAs: "data-isactive",
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.modal
  }, /*#__PURE__*/React.createElement(ToggleNotifications, {
    user: user
  })));
};

const ToggleNotifications = ({
  user
}) => {
  const {
    username = 'this user',
    id
  } = user;
  const {
    isNotificationDisabled,
    toggle,
    disabledBtn
  } = useNotificationToggle(id);

  const onClick = e => {
    e.stopPropagation();
    toggle(id, !isNotificationDisabled);
  };

  return /*#__PURE__*/React.createElement(Button, {
    disabled: disabledBtn,
    variant: "ghost",
    onClick: onClick,
    icon: "settings",
    className: styles.toggle
  }, "Turn ", isNotificationDisabled ? 'on' : 'off', " all from ", username);
};

export default NotificationActions;