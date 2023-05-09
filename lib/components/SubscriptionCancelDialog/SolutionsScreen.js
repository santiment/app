import React from 'react';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import ContactUs from '../ContactUs/ContactUs';
import styles from './SolutionsScreen.module.css';

const SolutionsScreen = ({
  closeDialog,
  nextScreen
}) => /*#__PURE__*/React.createElement(Dialog.ScrollContent, {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("h2", {
  className: styles.title
}, "Cancel subscription?"), /*#__PURE__*/React.createElement("section", {
  className: styles.section
}, /*#__PURE__*/React.createElement("p", {
  className: styles.text
}, "Before you go, give us a chance to help you:"), /*#__PURE__*/React.createElement("a", {
  className: styles.link,
  href: "https://academy.santiment.net/education-and-use-cases/"
}, "Discover use cases on our Academy"), /*#__PURE__*/React.createElement("a", {
  className: styles.link,
  href: "https://www.youtube.com/c/SantimentNetwork"
}, "Gain insights on our Youtube channel"), /*#__PURE__*/React.createElement(ContactUs, {
  className: styles.link,
  as: "a"
}, "Request a custom subscription plan")), /*#__PURE__*/React.createElement("div", {
  className: styles.actions
}, /*#__PURE__*/React.createElement(ContactUs, {
  variant: "fill",
  accent: "positive",
  onClick: closeDialog,
  className: styles.btn
}, "Contact Customer service"), /*#__PURE__*/React.createElement(Button, {
  accent: "positive",
  onClick: nextScreen
}, "Continue cancellation")));

export default SolutionsScreen;