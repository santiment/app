const _excluded = ["onChange", "type", "metric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Input from '@santiment-network/ui/Input';
import { useDebounce } from '../../../../../../hooks';
import { Filter } from '../../dataHub/types';
import styles from './ValueInput.module.css';

const ValueInput = _ref => {
  let {
    onChange,
    type,
    metric
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  let badge = Filter[type].badge || metric.badge || '';

  if (badge.length > 1) {
    badge = '';
  }

  const onChangeDebounced = useDebounce(value => {
    let transformedValue = value;

    if (Filter[type].onlyPositiveNumbers) {
      transformedValue = Math.abs(value);
    }

    onChange(transformedValue);
  }, 500);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.badge
  }, badge), /*#__PURE__*/React.createElement(Input, _extends({
    onChange: ({
      currentTarget: {
        value
      }
    }) => onChangeDebounced(value),
    className: cx(styles.input, badge && styles.input__withBadge)
  }, props)));
};

export default ValueInput;