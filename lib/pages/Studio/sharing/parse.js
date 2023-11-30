function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import 'san-studio/lib/metrics/selector/subitems'; // import { useMemo } from 'react'
// import { parse } from 'query-string'

import { Metric } from 'san-studio/lib/metrics';
import { parseWidget as parseChartWidget } from 'san-studio/lib/sharing/widget';
import { HolderDistributionMetric } from 'san-studio/lib/metrics/_onchain/holderDistributions';
import { newProjectMetric } from 'san-studio/lib/metrics/utils';
import { MERGED_DIVIDER, buildMergedMetric } from 'san-studio/lib/HolderDistributionWidget/utils';
import { cacheIndicator, Indicator } from 'san-studio/lib/ChartWidget/MetricSettings/IndicatorSetting/utils';
import { newExpessionMetric } from 'san-studio/lib/CombineDialog/utils';
import { parseMetricGraphValue } from './settings';
import { getWidgetByKey, parseSubwidgets } from './widgets';
import { parseChartAddons } from 'san-studio/lib/sharing/addons';
import { ExternalWidgetCreator } from '../Widget'; // import { parseSharedSidepanel } from '../../../ducks/Studio/url/parse'

import { getProjectMetricByKey, checkIsProjectMetricKey } from '../../../ducks/Studio/metrics';
import { COMPARE_CONNECTOR } from '../../../ducks/Studio/url/utils';
import { parseDrawings } from 'san-studio/lib/sharing/drawings';
import { parseDrawings as parseDrawings__legacy } from './drawings';
const CONTROLLER = {
  newProjectMetric,
  getMetricByKey: key => Metric[key] || parseMergedMetric(key)
};

function getMetric(metricKey) {
  const isLegacyCompareMetric = metricKey.includes(COMPARE_CONNECTOR);

  if (checkIsProjectMetricKey(metricKey) || isLegacyCompareMetric) {
    const controller = _extends({
      parseSlug: metricKey[0] === '_'
    }, CONTROLLER);

    const connector = isLegacyCompareMetric ? COMPARE_CONNECTOR : undefined;
    return getProjectMetricByKey(metricKey, connector, controller);
  }

  return Metric[metricKey] || parseMergedMetric(metricKey);
}

function parseMetric(metricKey, KnownMetric) {
  const metric = KnownMetric[metricKey] || getMetric(metricKey);
  KnownMetric[metricKey] = metric;
  return metric;
}

function parseAxesMetrics(metrics, KnownMetric) {
  if (!metrics) return;
  const disabledAxesMetrics = new Set(Object.values(KnownMetric));
  const axesMetrics = new Set();
  metrics.forEach(metricKey => {
    const metric = KnownMetric[metricKey];

    if (metric) {
      axesMetrics.add(metric);
      disabledAxesMetrics.delete(metric);
    }
  });
  return {
    axesMetrics,
    disabledAxesMetrics
  };
}

function parseIndicators(indicators, KnownMetric, metrics) {
  const MetricIndicators = {};
  if (!indicators) return MetricIndicators;
  metrics.forEach(metricKey => {
    if (!indicators[metricKey]) {
      // HACK(vanguard): forcing indicator parse from metric key
      metricKey = metricKey.slice(metricKey.indexOf('_') + 1);
      if (!indicators[metricKey]) return;
    }

    const metric = getMetric(metricKey);
    if (!metric) return;
    const indicatorMetrics = indicators[metricKey].slice();
    indicators[metricKey].forEach((indicatorKey, i) => {
      const indicator = Indicator[indicatorKey];

      if (metric) {
        const indicatorMetric = cacheIndicator(metric, indicator);
        KnownMetric[`${indicatorKey}_${metricKey}`] = indicatorMetric;
      }

      indicatorMetrics[i] = indicator;
      MetricIndicators[metric.key] = new Set(indicatorMetrics);
    });
  });
  return MetricIndicators;
}

function parseMergedMetric(metricKey) {
  const mergedMetricKeys = metricKey.split(MERGED_DIVIDER);
  if (mergedMetricKeys.length < 2) return;
  return buildMergedMetric(mergedMetricKeys.map(key => HolderDistributionMetric[key]));
}

function parseMergedMetrics(metrics, KnownMetric) {
  const mergedMetrics = [];
  metrics.forEach(metricKey => {
    let metric;

    try {
      metric = parseMergedMetric(metricKey);
    } catch (e) {
      return;
    }

    if (metric) {
      mergedMetrics.push(metric);
      KnownMetric[metricKey] = metric;
    }
  });
  return mergedMetrics;
}

function parseMetrics(metrics, comparables = [], KnownMetric) {
  return metrics.concat(comparables).map(key => parseMetric(key, KnownMetric)).filter(Boolean);
}

function parseProjectCombinedMetrics(metric) {
  return getProjectMetricByKey(metric.key, undefined, {
    getMetricByKey: () => metric,
    parseSlug: false
  });
}

function parseCombinedMetrics(metrics, KnownMetric) {
  return (metrics || []).map(({
    k,
    exp,
    l,
    bm
  }) => {
    let metric = newExpessionMetric(bm.map(getMetric), exp, l);
    metric.key = k;

    if (checkIsProjectMetricKey(k)) {
      metric = parseProjectCombinedMetrics(metric);
    }

    KnownMetric[k] = metric;
    return metric;
  });
}

export function parseWidget(widget) {
  const newExternalWidget = ExternalWidgetCreator[widget.widget];
  if (newExternalWidget) return newExternalWidget();
  const Widget = getWidgetByKey(widget.widget);
  const KnownMetric = {};

  if (widget.wm) {
    return _extends(Widget, parseChartWidget(widget, {
      parseSubwidgets
    }));
  }

  const {
    metrics,
    indicators,
    settings
  } = widget;
  parseCombinedMetrics(widget.combinedMetrics, KnownMetric);
  Widget.metricIndicators = parseIndicators(indicators, KnownMetric, metrics);
  Widget.mergedMetrics = parseMergedMetrics(metrics, KnownMetric);
  Widget.metrics = parseMetrics(metrics, widget.comparables, KnownMetric);
  Widget.metricSettings = parseMetricGraphValue(settings, KnownMetric, metrics);
  Widget.colors = parseMetricGraphValue(widget.colors, KnownMetric, metrics);

  _extends(Widget, parseAxesMetrics(widget.axesMetrics, KnownMetric));

  _extends(Widget, parseSubwidgets(widget.connectedWidgets));

  try {
    Widget.drawings = parseDrawings(widget.drawings);
  } catch (e) {
    Widget.drawings = parseDrawings__legacy(widget.drawings);
  }

  const {
    signalMetrics = []
  } = widget;
  Widget.signalMetrics = parseMetrics(signalMetrics, undefined, KnownMetric);
  Widget.holderLabels = widget.holderLabels;
  Widget.isSharedAxisEnabled = widget.wcsa;
  Widget.chartAddons = parseChartAddons(widget.wcadon);
  return Widget;
} // export function parseWidgets(widgets) {
//   return widgets.map(parseWidget)
// }
// function tryParseWidgets(widgets) {
//   try {
//     return parseWidgets(JSON.parse(widgets))
//   } catch (e) {
//     console.error(e)
//   }
// }
// function tryParseSharedSidewidget(sidewidget) {
//   try {
//     return parseSharedSidepanel(sidewidget)
//   } catch (e) {
//     console.error(e)
//   }
// }
// function tryParseSettings(settings) {
//   try {
//     return JSON.parse(settings)
//   } catch (e) {
//     console.error(e)
//   }
// }
// export function parseUrl(url) {
//   const { settings, widgets, sidepanel, layout } = parse(url.slice(url.indexOf('?')))
//   return {
//     settings: settings && tryParseSettings(settings),
//     widgets: widgets && tryParseWidgets(widgets),
//     sidewidget: sidepanel && tryParseSharedSidewidget(sidepanel),
//     layout,
//   }
// }
// export function useUrlParse(parsedUrl) {
//   return useMemo(() => {
//     if (parsedUrl) return parsedUrl
//     const { widgets, settings, sidewidget } = parseUrl(window.location.search)
//     return {
//       settings,
//       widgets,
//       sidewidget,
//     }
//   }, [])
// }