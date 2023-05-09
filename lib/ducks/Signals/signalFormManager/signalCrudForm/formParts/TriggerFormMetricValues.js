import React from 'react';
import cx from 'classnames';
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect';
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput';
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel';
import { TIME_WINDOW_UNITS } from '../../../utils/constants';
import { LastPriceComponent } from './TriggerLastPrice';
import MetricOptionsRenderer from './metricOptions/MetricOptionsRenderer';
import { isPriceMetric, mapTargetObject, targetMapper } from '../../../utils/utils';
import { isDailyMetric } from './metricTypes/metrics';
import styles from '../signal/TriggerForm.module.css';
export const TriggerFormMetricValues = ({
  values: {
    type,
    metric,
    absoluteBorderRight = 0,
    absoluteBorderLeft = 0,
    target
  },
  blocks = [],
  showTypes,
  metaFormSettings,
  typeSelectors
}) => {
  const {
    key
  } = metric;
  const isPrice = isPriceMetric(metric);
  const mappedTargets = mapTargetObject(target, targetMapper);
  const slugName = !Array.isArray(mappedTargets) ? mappedTargets : undefined;
  const isTimeWindow = blocks.includes('timeWindow') && !isDailyMetric(key);
  const defaultType = metaFormSettings.type;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.metricValues
  }, showTypes && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Choose condition"
  }), /*#__PURE__*/React.createElement(FormikSelect, {
    name: "type",
    isClearable: false,
    isSearchable: true,
    disabled: defaultType.isDisabled,
    defaultValue: defaultType.value,
    placeholder: "Choose a type",
    options: typeSelectors,
    optionRenderer: MetricOptionsRenderer,
    isOptionDisabled: option => !option.value
  })), type && blocks.includes('absoluteThreshold') && /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: isPrice ? 'Price limit' : 'Limit'
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "absoluteThreshold",
    type: "number",
    placeholder: "Absolute value",
    prefix: isPrice ? '$' : ''
  }), isPrice && /*#__PURE__*/React.createElement(LastPriceComponent, {
    slugTitle: slugName
  }))), type && blocks.includes('absoluteBorders') && /*#__PURE__*/React.createElement("div", {
    className: styles.flexRow
  }, /*#__PURE__*/React.createElement(AbsoluteBorders, {
    isPriceMetric: isPrice,
    absoluteBorderRight: absoluteBorderRight,
    absoluteBorderLeft: absoluteBorderLeft,
    slugName: slugName
  })), type && blocks.includes('percentThreshold') && /*#__PURE__*/React.createElement(PercentThreshold, {
    isPriceMetric: isPrice,
    slugName: slugName
  }), type && blocks.includes('percentThresholdLeft') && blocks.includes('percentThresholdRight') && /*#__PURE__*/React.createElement("div", {
    className: styles.flexRow
  }, /*#__PURE__*/React.createElement(PercentThresholdByBorders, {
    isPriceMetric: isPrice,
    slugName: slugName
  })), type && blocks.includes('threshold') && /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Threshold",
    inner: true
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "threshold",
    step: 0.001,
    type: "number",
    placeholder: "Threshold"
  })), isTimeWindow && type && /*#__PURE__*/React.createElement(TimeWindow, null));
};

const TimeWindow = () => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.Field, styles.fieldTimeWindow)
}, /*#__PURE__*/React.createElement(FormikLabel, {
  text: "Time window"
}), /*#__PURE__*/React.createElement("div", {
  className: styles.timeWindow
}, /*#__PURE__*/React.createElement("div", {
  className: styles.timeWindowInput
}, /*#__PURE__*/React.createElement(FormikInput, {
  name: "timeWindow",
  type: "number",
  min: 0,
  placeholder: "Time window"
})), /*#__PURE__*/React.createElement("div", {
  className: styles.timeWindowUnit
}, /*#__PURE__*/React.createElement(FormikSelect, {
  name: "timeWindowUnit",
  className: styles.timeWindowUnit,
  clearable: false,
  placeholder: "Unit",
  options: TIME_WINDOW_UNITS
}))));

const PercentThreshold = ({
  isPriceMetric,
  slugName
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Percentage amount"
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "percentThreshold",
    type: "number",
    prefix: "%",
    placeholder: "Percentage amount"
  }), isPriceMetric && /*#__PURE__*/React.createElement(LastPriceComponent, {
    slugTitle: slugName
  }));
};

const PercentThresholdByBorders = ({
  isPriceMetric,
  slugName
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Moving up %"
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "percentThresholdLeft",
    type: "number",
    prefix: "%",
    placeholder: "%"
  }), isPriceMetric && /*#__PURE__*/React.createElement(LastPriceComponent, {
    slugTitle: slugName
  })), /*#__PURE__*/React.createElement("span", {
    className: styles.or
  }, "or"), /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Moving down %"
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "percentThresholdRight",
    type: "number",
    prefix: "%",
    placeholder: "%"
  })));
};

const AbsoluteBorders = ({
  isPriceMetric,
  absoluteBorderRight,
  absoluteBorderLeft,
  slugName
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Lower border"
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "absoluteBorderLeft",
    type: "number",
    step: "any",
    prefix: isPriceMetric ? '$' : '',
    max: +absoluteBorderRight,
    placeholder: "0"
  }), isPriceMetric && /*#__PURE__*/React.createElement(LastPriceComponent, {
    slugTitle: slugName
  })), /*#__PURE__*/React.createElement("span", {
    className: styles.or
  }, "and"), /*#__PURE__*/React.createElement("div", {
    className: styles.Field
  }, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Upper border"
  }), /*#__PURE__*/React.createElement(FormikInput, {
    name: "absoluteBorderRight",
    type: "number",
    prefix: isPriceMetric ? '$' : '',
    min: +absoluteBorderLeft,
    step: "any",
    placeholder: "1"
  })));
};