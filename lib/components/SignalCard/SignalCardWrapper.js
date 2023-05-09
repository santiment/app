import React from 'react';
import cx from 'classnames';
import MultilineText from '../MultilineText/MultilineText';
import { SignalTypeIcon } from './controls/SignalControls';
import styles from './card/SignalCard.module.css';
export const SignalCardWrapper = ({
  isModal = true,
  trigger,
  children
}) => {
  const {
    id,
    description,
    title,
    settings: {
      metric,
      type
    }
  } = trigger;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper__top
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper__left, styles.wrapper__left_subscription)
  }, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper__right
  }, /*#__PURE__*/React.createElement("div", {
    id: id,
    className: isModal ? styles.upper : ''
  }, /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("h3", {
    className: styles.description
  }, /*#__PURE__*/React.createElement(MultilineText, {
    id: "SignalCard__description",
    maxLines: 2,
    text: description && description
  }))), children));
};