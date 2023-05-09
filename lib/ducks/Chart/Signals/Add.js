const _excluded = ["hoverPoint"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useRef } from 'react';
import Alerts from '../../Studio/Alerts';
import styles from './index.module.css';
export default (_ref => {
  let {
    hoverPoint
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;

    if (container && container.getBoundingClientRect().x < -15) {
      container.classList.add(styles.alerts_right);
    }
  }, [containerRef]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.add,
    style: {
      '--top': hoverPoint.y + 'px'
    }
  }, /*#__PURE__*/React.createElement(Alerts, _extends({}, rest, hoverPoint, {
    className: styles.alerts,
    containerRef: containerRef
  })));
});