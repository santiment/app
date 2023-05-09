import React from 'react';
import Features from '../../../components/Plans/Features';
import ContactUs from '../../../components/ContactUs/ContactUs';
import styles from './PlanDescriptions.module.css';
const Blocks = [{
  title: 'Data Science as a Service (DSaaS)',
  description: 'Tailored crypto analytics - from a veteran team',
  btn: /*#__PURE__*/React.createElement(ContactUs, {
    variant: "ghost",
    className: styles.btn,
    border: true,
    message: "Talk with expert about Data Science as a Service."
  }, "Contact sales"),
  features: [/*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Custom crypto dashboards"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Backtesting"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Trading models"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Full access to our quant lab")]
}, {
  title: 'Education & Onboarding',
  description: 'New to on-chain and fundamental data?',
  btn: /*#__PURE__*/React.createElement(ContactUs, {
    variant: "ghost",
    className: styles.btn,
    border: true,
    message: "Talk with expert about Education & Onboarding."
  }, "Contact sales"),
  features: [/*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Individual walkthroughs"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Personalized tutorials, metric use cases and demos"), /*#__PURE__*/React.createElement("div", {
    className: styles.feature__link
  }, "Weekly educational calls")]
}];

const PlanDescriptions = () => /*#__PURE__*/React.createElement("div", {
  className: styles.container
}, Blocks.map(({
  title,
  description,
  btn,
  features = []
}, index) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.block,
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), /*#__PURE__*/React.createElement(Features, {
    isGreen: true,
    data: features,
    classes: styles
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.action
  }, btn));
}));

export default PlanDescriptions;