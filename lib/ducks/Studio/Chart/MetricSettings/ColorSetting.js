import React, { useRef } from 'react';
import Setting from './Setting';
import { useColorByMetric, useMetricColorUpdater } from '../../Widget/ChartWidgetColorProvider';
import { useDebounce } from '../../../../hooks/index';
import styles from './index.module.css';

const ColorSetting = ({
  metric
}) => {
  const inputRef = useRef();
  const color = useColorByMetric(metric);
  const updateMetricColor = useMetricColorUpdater();
  const debouncedColorUpdate = useDebounce(updateMetricColor, 500);

  function onClick() {
    inputRef.current.click();
  }

  function onChange({
    target: {
      value
    }
  }) {
    debouncedColorUpdate(metric.key, value);
  }

  return /*#__PURE__*/React.createElement(Setting, {
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.color,
    style: {
      '--color': color
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: styles.colorInput,
    type: "color",
    onChange: onChange,
    value: color,
    ref: inputRef
  }));
};

export default ColorSetting;