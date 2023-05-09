import React from 'react';
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon';
import { formatNumber } from '../../../utils/formatting';
import styles from './FlowToExchanges.module.css';

const FlowToExchanges = ({
  item: {
    slug,
    ticker,
    name,
    value,
    logoUrl
  }
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement(ProjectIcon, {
    size: 36,
    slug: slug,
    logoUrl: logoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.name
  }, name), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, formatNumber(value), " ", ticker)));
};

export default FlowToExchanges;