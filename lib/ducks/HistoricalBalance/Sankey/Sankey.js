import React, { useEffect } from 'react';
import { mountSankey, querySankey } from './utils';
import styles from './index.module.css';

const SankeyGraph = ({
  id,
  address,
  currency,
  inbound,
  outbound,
  detail
}) => {
  useEffect(() => {
    mountSankey(id);
  }, []);
  useEffect(() => {
    if (!currency) return;
    querySankey({
      address: address.toLowerCase(),
      inbound,
      outbound,
      detail,
      currency
    });
  }, [address, currency, inbound, outbound, detail]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: id
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.powered
  }, "Data by", /*#__PURE__*/React.createElement("a", {
    href: "https://bitquery.io/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: styles.powered__link
  }), "GraphQL API"));
};

SankeyGraph.defaultProps = {
  id: 'sankey-graph'
};
export default SankeyGraph;