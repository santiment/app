import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { useDialogState } from '../../hooks/dialog';
import AccordionContent from '../AccordionContent';
import styles from './ExpansionItem.module.css';

const ExpansionItem = ({
  iconType,
  title,
  children,
  isOpen,
  classes = {}
}) => {
  const {
    openDialog,
    isOpened,
    closeDialog
  } = useDialogState(isOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, classes.expansion)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, classes.title, isOpened && classes.opened),
    onClick: isOpened ? closeDialog : openDialog
  }, title, /*#__PURE__*/React.createElement(Icon, {
    className: cx(styles.arrow, isOpened && styles.arrowOpened, classes.arrow),
    type: iconType || 'arrow-down-big'
  })), /*#__PURE__*/React.createElement(AccordionContent, {
    show: isOpened
  }, children));
};

export default ExpansionItem;