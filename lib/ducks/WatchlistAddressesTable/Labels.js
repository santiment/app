import React from 'react';
import { Label, CollapsedLabels } from '../HistoricalBalance/Address/Labels';
import styles from './index.module.css';

const Labels = ({
  labels
}) => {
  if (!labels) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  const visibleLabels = labels.slice(0, 2);
  const hiddenLabels = labels.slice(2);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.labels
  }, visibleLabels.map(Label), !!hiddenLabels.length && /*#__PURE__*/React.createElement(CollapsedLabels, {
    labels: hiddenLabels
  }));
};

export default Labels;