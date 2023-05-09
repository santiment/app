function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState } from 'react';
import cx from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import Label from '@santiment-network/ui/Label';
import Loader from '@santiment-network/ui/Loader/Loader';
import PercentChanges from '../PercentChanges';
import { METRIC_HIGH_LOW_QUERY } from './gql';
import styles from './index.module.css';
const DEFAULT_RANGE_HOURS = [{
  range: '24h',
  hours: 24
}, {
  range: '7d',
  hours: 24 * 7
}];

function getPeriod(hours) {
  const to = new Date();
  const from = new Date();
  to.setHours(to.getHours(), 0, 0, 0);
  from.setHours(from.getHours() - hours, 0, 0, 0);
  return {
    from: from.toISOString(),
    to: to.toISOString()
  };
}

const Value = ({
  loading,
  value,
  formatter
}) => loading ? /*#__PURE__*/React.createElement(Loader, {
  className: styles.loader
}) : /*#__PURE__*/React.createElement("span", null, formatter(value));

const MetricHighLow = ({
  className,
  metric,
  slug,
  rangeHours,
  label,
  changes,
  selectedIndex,
  formatter,
  onRangeChange
}) => {
  const [index, setIndex] = useState(selectedIndex);
  const {
    range,
    hours
  } = rangeHours[index];
  const {
    loading,
    data = {}
  } = useQuery(METRIC_HIGH_LOW_QUERY, {
    skip: !(metric && slug),
    variables: _objectSpread({
      metric,
      slug
    }, getPeriod(hours))
  });
  const {
    min = 0,
    max = 0,
    last = 0
  } = data.getMetric || {};
  let offset = (last - min) * 100 / (max - min);
  if (!isFinite(offset)) return null;

  if (offset < 0) {
    offset = 0;
  } else if (offset > 100) {
    offset = 100;
  }

  function cycleRange() {
    const newIndex = (index + 1) % rangeHours.length;
    setIndex(newIndex);

    if (onRangeChange) {
      onRangeChange(rangeHours[newIndex].range);
    }
  }

  return /*#__PURE__*/React.createElement("section", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, changes ? /*#__PURE__*/React.createElement(PercentChanges, {
    changes: changes
  }) : /*#__PURE__*/React.createElement("span", {
    className: styles.text
  }, "High/Low ", label), /*#__PURE__*/React.createElement(Label, {
    className: cx(styles.period, rangeHours.length === 1 && styles.period_only),
    onClick: cycleRange
  }, range)), /*#__PURE__*/React.createElement("div", {
    className: styles.progress,
    style: {
      '--progress': `${offset}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.row, styles.values)
  }, /*#__PURE__*/React.createElement(Value, {
    loading: loading,
    value: min,
    formatter: formatter
  }), /*#__PURE__*/React.createElement(Value, {
    loading: loading,
    value: max,
    formatter: formatter
  })));
};

MetricHighLow.defaultProps = {
  rangeHours: DEFAULT_RANGE_HOURS,
  selectedIndex: 0,
  formatter: v => v
};
export default MetricHighLow;