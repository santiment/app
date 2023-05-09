import React, { useState } from 'react';
import CurrencyTransfers from './CurrencyTransfers';
import DepthLevel from './DepthLevel';
import DetailLevel from './DetailLevel';
import Fullscreen from './Fullscreen';
import Sankey from './Sankey';
import styles from './index.module.css';

const Graph = ({
  address
}) => {
  const [currency, setCurrency] = useState();
  const [inbound, setInbound] = useState(1);
  const [outbound, setOutbound] = useState(1);
  const [detail, setDetail] = useState(10);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.controls
  }, /*#__PURE__*/React.createElement(CurrencyTransfers, {
    address: address,
    currency: currency,
    setCurrency: setCurrency
  }), /*#__PURE__*/React.createElement(DepthLevel, {
    name: "Inbound",
    value: inbound,
    onChange: setInbound
  }), /*#__PURE__*/React.createElement(DepthLevel, {
    name: "Outbound",
    value: outbound,
    onChange: setOutbound
  }), /*#__PURE__*/React.createElement(DetailLevel, {
    value: detail,
    onChange: setDetail
  }), /*#__PURE__*/React.createElement(Fullscreen, {
    address: address,
    currency: currency,
    inbound: inbound,
    outbound: outbound,
    detail: detail
  })), /*#__PURE__*/React.createElement(Sankey, {
    address: address,
    currency: currency,
    inbound: inbound,
    outbound: outbound,
    detail: detail
  }));
};

export default Graph;