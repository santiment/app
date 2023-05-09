import React, { useEffect, useState } from 'react';
import Dialog from '@santiment-network/ui/Dialog';
import { getNearestTypeByMetric, getSlugFromSignalTarget } from '../../../../utils/utils';
import { METRICS_OPTIONS, TRENDING_WORDS } from '../../../../utils/constants';
import MetricTypeRenderer from '../metricTypeRenderer/MetricTypeRenderer';
import SupportedMetricsList, { useAvailableMetrics } from './SupportedMetricsList';
import { capitalizeStr } from '../../../../../../utils/utils';
import { useDialogState } from '../../../../../../hooks/dialog';
import { Metric } from '../../../../../dataHub/metrics';
import styles from '../../signal/TriggerForm.module.css';
import metricStyles from './TriggerFormMetricTypes.module.css';

const checkPossibleTarget = ({
  metaFormSettings,
  setFieldValue,
  target
}) => {
  if (!target || Array.isArray(target) && target.length === 0) {
    setFieldValue('target', metaFormSettings.target.value);
  }
};

const TriggerFormMetricTypes = ({
  metric,
  target,
  setFieldValue,
  metaFormSettings,
  trigger
}) => {
  const defaultMetric = metaFormSettings.metric;
  const [error, showErrorAlert] = useState('');
  const {
    isOpened,
    openDialog,
    closeDialog
  } = useDialogState(false);

  const onSelectMetric = newMetric => {
    metric && newMetric && newMetric.value !== metric.value && setFieldValue('type', getNearestTypeByMetric(newMetric));

    if (newMetric) {
      if (newMetric.value !== TRENDING_WORDS) {
        checkPossibleTarget({
          metaFormSettings,
          setFieldValue,
          target
        });
      }
    } else {
      if (target) {
        setFieldValue('target', '');
      }
    }

    setFieldValue('metric', newMetric);
    closeDialog();
  };

  const slug = getSlugFromSignalTarget(trigger);
  const [{
    availableMetrics
  }, loading] = useAvailableMetrics(slug);
  useEffect(() => {
    if (slug && !loading) {
      const checking = trigger.settings.metric;
      const notAvailable = availableMetrics.indexOf(checking) === -1;
      const notDefined = !METRICS_OPTIONS.some(({
        metric
      }) => metric === checking);

      if (notAvailable && notDefined) {
        const nameOfMetric = Metric[checking] && Metric[checking].label || checking;
        showErrorAlert(`${capitalizeStr(slug)} does't support alerts with metric '${nameOfMetric}'`);
      } else {
        showErrorAlert('');
      }
    }
  }, [slug, availableMetrics]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement(Dialog, {
    open: isOpened,
    onOpen: openDialog,
    onClose: closeDialog,
    classes: metricStyles,
    trigger: /*#__PURE__*/React.createElement(MetricTypeRenderer, {
      metric: metric || defaultMetric.value
    })
  }, /*#__PURE__*/React.createElement(Dialog.ScrollContent, null, /*#__PURE__*/React.createElement("div", {
    className: metricStyles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: metricStyles.metricsHeader
  }, /*#__PURE__*/React.createElement("div", {
    className: metricStyles.metricsTitle
  }, "Choose alert type"), /*#__PURE__*/React.createElement("div", {
    className: metricStyles.metricsExplanation
  }, "Pick one of the most popular metrics")), error && /*#__PURE__*/React.createElement("div", {
    className: metricStyles.error
  }, error), /*#__PURE__*/React.createElement("div", {
    className: metricStyles.baseTypes
  }, METRICS_OPTIONS.map(item => /*#__PURE__*/React.createElement("div", {
    className: metricStyles.listItem,
    key: item.value
  }, /*#__PURE__*/React.createElement(MetricTypeRenderer, {
    metric: item,
    onClick: onSelectMetric,
    showLabel: false
  })))), /*#__PURE__*/React.createElement(SupportedMetricsList, {
    slug: slug,
    onSelectMetric: onSelectMetric,
    availableMetrics: availableMetrics,
    trigger: trigger
  })))));
};

export default TriggerFormMetricTypes;