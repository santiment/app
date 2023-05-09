import React, { useMemo } from 'react';
import Tooltip from '@santiment-network/ui/Tooltip';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel';
import ContactUs from '../../../../components/ContactUs/ContactUs';
import styles from './MetricErrorExplanation.module.css';

const MetricErrorExplanation = ({
  errorsForMetrics,
  metric,
  settings
}) => {
  const metricError = useMemo(() => {
    const {
      errors_timeseries_metrics
    } = errorsForMetrics || {};
    return errors_timeseries_metrics ? errors_timeseries_metrics.find(({
      name
    }) => name === metric.key) : '';
  }, [errorsForMetrics, metric]);

  if (!metricError || !metricError.details) {
    return null;
  }

  const text = `There is a problem with metric '${metric.label}' for ${settings.slug}.`;
  return /*#__PURE__*/React.createElement(Tooltip, {
    position: "bottom",
    align: "start",
    on: "click",
    closeTimeout: 500,
    trigger: /*#__PURE__*/React.createElement("div", {
      className: styles.trigger
    }, "No data?")
  }, /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: styles.explanation
  }, /*#__PURE__*/React.createElement("div", null, [text, ' If Intercom is not activated or exist, send a email to ', /*#__PURE__*/React.createElement(Button, {
    as: "a",
    key: "link",
    className: styles.link,
    href: "mailto:support@santiment.net"
  }, "support@santiment.net")]), /*#__PURE__*/React.createElement(ContactUs, {
    border: true,
    variant: "flat",
    className: styles.reportBtn,
    message: text + ' Error: ' + metricError.details[0]
  }, "Report a problem")));
};

export default MetricErrorExplanation;