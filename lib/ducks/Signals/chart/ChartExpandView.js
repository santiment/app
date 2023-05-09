import React from 'react';
import cx from 'classnames';
import Dialog from '@santiment-network/ui/Dialog';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip';
import styles from './ChartExpandView.module.css';
export const ChartExpandView = ({
  children,
  classes = {}
}) => {
  return /*#__PURE__*/React.createElement(Dialog, {
    title: "Smart Chart",
    classes: styles,
    trigger: /*#__PURE__*/React.createElement(Button, {
      className: cx(styles.btn, classes.expanderButton),
      type: "button",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(ExplanationTooltip, {
      position: "top",
      offsetY: 5,
      text: "Expand",
      className: styles.explanation
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "fullscreen"
    })))
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, null, children));
};