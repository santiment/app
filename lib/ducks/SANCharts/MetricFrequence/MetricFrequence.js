import React from 'react';
import cx from 'classnames';
import Frequences from '../../dataHub/metrics/frequences';
import styles from './MetricFrequence.module.css';

const MetricFrequence = ({
  metric: {
    key
  },
  classes = {}
}) => {
  const fr = Frequences[key];

  if (!fr) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classes.frequency
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, classes.frequencyTitle)
  }, "Frequency:"), fr);
};

export default MetricFrequence;