import React, { Fragment } from 'react';
import cx from 'classnames';
import { TooltipSetting } from '../../dataHub/tooltipSettings';
import { tooltipLabelFormatter, tooltipValueFormatter } from '../../dataHub/metrics/formatters';
import styles from './CommonChartTooltip.module.css';

const ChartTooltip = ({
  valueFormatter = tooltipValueFormatter,
  labelFormatter = tooltipLabelFormatter,
  className,
  active,
  payload: initialPayload = [],
  label,
  hideItem,
  withLabel = true,
  showValueLabel = true,
  events,
  classes = {}
}) => {
  const payload = initialPayload ? hideItem ? initialPayload.filter(({
    dataKey
  }) => !hideItem(dataKey)) : initialPayload : [];

  if (events && events[label]) {
    payload.push(...events[label]);
  }

  return active && payload && payload.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.details, className)
  }, withLabel && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, classes.tooltipHeader)
  }, labelFormatter(label, payload)), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, payload.map((p, index) => {
    const {
      key,
      dataKey = key,
      value,
      name,
      formatter,
      payload: innerPayload
    } = p; // // for compability with tree maps [GarageInc|14.07.2020]

    let {
      color
    } = p;

    if (!color && innerPayload) {
      color = innerPayload.color;
    }

    const foundedSettings = TooltipSetting[key] || {};
    return /*#__PURE__*/React.createElement("div", {
      key: dataKey || index,
      style: {
        '--color': color
      },
      className: styles.metric
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.value
    }, valueFormatter({
      value,
      key: dataKey,
      formatter: foundedSettings.formatter || formatter,
      payload
    })), showValueLabel && /*#__PURE__*/React.createElement("span", {
      className: styles.name
    }, foundedSettings.label || name || dataKey));
  })));
};

export const ProjectsChartTooltip = ({
  labelFormatter = tooltipLabelFormatter,
  payloadLabels = [],
  className,
  active,
  payload = [],
  label,
  classes = {}
}) => {
  return active && payload && payload.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.details, styles.strict, className),
    style: {
      '--bgcolor': payload[0].payload.color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, classes.tooltipTitle)
  }, labelFormatter(label, payload)), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, payload.map((p, index) => {
    const {
      key,
      dataKey = key,
      payload: original
    } = p;
    return /*#__PURE__*/React.createElement(Fragment, {
      key: dataKey || index
    }, payloadLabels.map(({
      key: labelKey,
      label,
      formatter
    }) => {
      const value = original[labelKey] || 0;
      return /*#__PURE__*/React.createElement("div", {
        key: labelKey,
        className: styles.row
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.key
      }, label), /*#__PURE__*/React.createElement("span", {
        className: styles.value
      }, formatter(value)));
    }));
  })));
};
export const renderLegend = ({
  payload: items,
  labelFormatter
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.legend
  }, items.map((item, index) => {
    const {
      payload: {
        color,
        fill,
        opacity,
        dataKey
      }
    } = item;
    return /*#__PURE__*/React.createElement("div", {
      key: dataKey || index,
      style: {
        '--color': color || fill
      },
      opacity: opacity,
      className: cx(styles.metric, styles.label)
    }, labelFormatter(dataKey));
  }));
};
export default ChartTooltip;