function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useEffect, useMemo, useState } from 'react';
import { TooltipSetting } from '../../dataHub/tooltipSettings';
import { MirroredMetric } from '../../dataHub/metrics/mirrored';
import { getMetricLabel } from '../../dataHub/metrics/labels';
let widgetId = -1;
export const newId = () => ++widgetId;
export const newWidget = (Widget, props) => _extends({
  Widget,
  id: newId(),
  chartRef: {
    current: null
  }
}, props);
export const useMetricNodeOverwrite = MetricSettingMap => useMemo(() => {
  const metricNode = {};
  MetricSettingMap.forEach(({
    interval,
    node: nodeOverwrite
  }, metric) => {
    const node = nodeOverwrite || metric.node;

    if (interval && node === 'bar') {
      metricNode[metric.key] = 'autoWidthBar';
    } else {
      metricNode[metric.key] = node;
    }
  });
  return metricNode;
}, [MetricSettingMap]);
export const useMirroredTransformer = metrics => {
  const [MetricTransformer, setMetricTransformer] = useState({});
  useEffect(() => {
    const metricTransformer = _extends({}, MetricTransformer);

    metrics.forEach(metric => {
      const mirrorOf = MirroredMetric[metric.key];

      if (mirrorOf) {
        const {
          key,
          preTransformer
        } = metric;
        const hasMirror = metrics.some(({
          key: mirrorKey
        }) => mirrorKey === key);

        if (hasMirror) {
          metricTransformer[key] = preTransformer;
        } else {
          metricTransformer[key] = undefined;
        }
      }
    });
    setMetricTransformer(metricTransformer);
  }, [metrics]);
  return MetricTransformer;
};
export function useWidgetProjectSettings(widget, settings) {
  const {
    from,
    to
  } = settings;
  return useMemo(() => {
    const {
      slug,
      ticker
    } = settings;
    widget.project = widget.project || {
      slug,
      ticker
    };
    return _extends({}, settings, widget.project);
  }, [from, to]);
}
export function useWidgetMetricLabeling(chartRef, metrics, settings) {
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const freeMetrics = metrics.filter(m => !m.project);
    const oldLabels = new Array(freeMetrics.length);
    freeMetrics.forEach((metric, i) => {
      const {
        key,
        dataKey = key
      } = metric;
      const tooltipSetting = TooltipSetting[dataKey];
      oldLabels[i] = [tooltipSetting, tooltipSetting.label, metric];

      if (metric.indicator) {
        const {
          base,
          indicator
        } = metric;
        metric.label = `${base.label} (${settings.ticker}) ${indicator.label}`;
        tooltipSetting.label = metric.label;
      } else {
        tooltipSetting.label = getMetricLabel(metric, settings);
      }
    });
    return () => oldLabels.forEach(([tooltipSetting, label, metric]) => {
      tooltipSetting.label = label;

      if (metric.indicator) {
        metric.label = label;
      }
    });
  }, [metrics, settings.ticker]);
}