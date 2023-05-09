import React from 'react';
import CryptoBrImg from './cb.png';
import ForbesImg from './forbes.png';
import BitcoinImg from './bitcoin.png';
import Newyorker from './new-yorker.png';
import CoindeskImg from './coindesk.png';
import BloomberImg from './bloomberg.png';
import CoinTelegraphImg from './cointelegraph.png';
import styles from './Companies.module.css';

const Companies = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("img", {
    alt: "bloomberg",
    src: BloomberImg,
    width: "260"
  }), /*#__PURE__*/React.createElement("img", {
    alt: "forbes",
    src: ForbesImg,
    width: "176"
  }), /*#__PURE__*/React.createElement("img", {
    alt: "coindesk",
    src: CoindeskImg,
    width: "226"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("img", {
    alt: "cointelegraph",
    src: CoinTelegraphImg,
    width: "258"
  }), /*#__PURE__*/React.createElement("img", {
    alt: "cryptobriefing",
    src: CryptoBrImg,
    width: "163"
  }), /*#__PURE__*/React.createElement("img", {
    alt: "newyorker",
    src: Newyorker,
    width: "195"
  }), /*#__PURE__*/React.createElement("img", {
    alt: "bitcoin",
    src: BitcoinImg,
    width: "255"
  }))));
};

export default Companies;