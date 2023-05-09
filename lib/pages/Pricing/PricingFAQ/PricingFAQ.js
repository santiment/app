import React from 'react';
import ExpansionItem from '../../../components/ExpansionItem/ExpansionItem';
import styles from './PricingFAQ.module.css';
const QUESTIONS = [// {
//   title: 'Is there a free trial?',
//   descr:
//     'Yes! You can try all the paywalled features of our platform for a full week, right after your first login. There is no additional information needed for the trial and it will cancel automatically when it runs out.'
// },
{
  title: 'Can I cancel my paid subscription at any time?',
  descr: 'Yes! A subscription can either be paid for a month or a year in advance. During this time period, you can cancel your subscription at any point. This will let you use your Pro status for the rest of your billing period without any changes.'
}, {
  title: 'Is it possible to combine different discounts?',
  descr: 'It is not possible to combine different discounts at this point in time. Please note that most discount codes we share are valid for a single billing cycle (one month or one year respectively), while the discount for holding over a thousand SAN token is valid for as long as the tokens are held.'
}, {
  title: 'Can I pay in crypto?',
  descr: /*#__PURE__*/React.createElement(React.Fragment, null, "Yes! You can pay in ETH, BTC or any established Ethereum-based stablecoin. There are other options too, involving our SAN token. You can find more information here:", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://academy.santiment.net/products-and-plans/how-to-pay-with-crypto/",
    className: styles.link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "pay with crypto"))
}, {
  title: "My question wasn't listed here, help!",
  descr: /*#__PURE__*/React.createElement(React.Fragment, null, "Our", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://academy.santiment.net/",
    className: styles.link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Santiment Academy"), ' ', "is aimed to answer many of your initial questions. But please do not hesitate to contact us, either! You should see a chat icon in the lower right corner of this screen. Click it and you'll have the chance to chat with one of us right away. Both our team and our community are available on Discord, too:", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://santiment.net/discord",
    className: styles.link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "https://santiment.net/discord"))
}];

const PricingFAQ = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, "Frequently Asked Questions"), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, QUESTIONS.map(({
    title,
    descr
  }, index) => /*#__PURE__*/React.createElement(ExpansionItem, {
    isOpen: index === 0,
    title: title,
    key: index,
    classes: styles
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, descr)))));
};

export default PricingFAQ;