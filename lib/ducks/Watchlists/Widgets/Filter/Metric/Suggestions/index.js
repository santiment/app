const _excluded = ["label", "description"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip';
import styles from './index.module.css';

const Suggestions = ({
  hints,
  onSuggestionClick
}) => {
  return hints ? /*#__PURE__*/React.createElement("div", {
    className: styles.suggestions
  }, "Suggestions:", hints.map((_ref, idx) => {
    let {
      label,
      description
    } = _ref,
        props = _objectWithoutProperties(_ref, _excluded);

    return description ? /*#__PURE__*/React.createElement(DarkTooltip, {
      key: idx,
      position: "bottom",
      align: "center",
      on: "hover",
      className: styles.tooltip,
      trigger: /*#__PURE__*/React.createElement("span", {
        className: styles.hint,
        onClick: () => onSuggestionClick(props)
      }, label)
    }, description) : /*#__PURE__*/React.createElement("span", {
      key: idx,
      className: styles.hint,
      onClick: () => onSuggestionClick(props)
    }, label);
  })) : null;
};

export default Suggestions;