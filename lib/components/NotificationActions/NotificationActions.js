import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './NotificationActions.module.css';

const UndoTrigger = ({
  onClick,
  isOpenLink
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  className: cx(styles.undo, isOpenLink && styles.margin)
}, "Undo");

const NotificationActions = ({
  id,
  link,
  isOpenLink = true,
  isDialog = true,
  undoTrigger: ElUndo,
  onClick
}) => {
  const [show, setShow] = useState(true);

  const hide = () => setShow(false);

  if (!show) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, isOpenLink && /*#__PURE__*/React.createElement(Link, {
    className: styles.link,
    to: link
  }, "Open"), isDialog && ElUndo ? /*#__PURE__*/React.createElement(ElUndo, {
    id: id,
    trigger: ({
      onClick
    }) => /*#__PURE__*/React.createElement(UndoTrigger, {
      isOpenLink: isOpenLink,
      onClick: () => {
        onClick();
        hide();
      }
    }),
    withConfirm: false
  }) : /*#__PURE__*/React.createElement(UndoTrigger, {
    isOpenLink: isOpenLink,
    onClick: () => {
      onClick();
      hide();
    }
  }));
};

export default NotificationActions;