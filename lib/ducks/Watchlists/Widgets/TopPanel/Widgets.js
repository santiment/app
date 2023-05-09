function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useCallback } from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Toggle from '@santiment-network/ui/Toggle';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel/Panel';
import styles from './Widgets.module.css';

const Widgets = ({
  widgets,
  setWidgets
}) => {
  const {
    isPriceChartActive,
    isMovement,
    isPriceTreeMap,
    isVolumeTreeMap
  } = widgets;
  const priceToggle = useCallback(isPriceChartActive => {
    setWidgets(_objectSpread(_objectSpread({}, widgets), {}, {
      isPriceChartActive
    }));
  }, [widgets]);
  const togglePriceTreeMap = useCallback(isPriceTreeMap => {
    setWidgets(_objectSpread(_objectSpread({}, widgets), {}, {
      isPriceTreeMap
    }));
  }, [widgets]);
  const toggleVolumeTreeMap = useCallback(isVolumeTreeMap => {
    setWidgets(_objectSpread(_objectSpread({}, widgets), {}, {
      isVolumeTreeMap
    }));
  }, [widgets]);
  const movementToggle = useCallback(isMovement => {
    setWidgets(_objectSpread(_objectSpread({}, widgets), {}, {
      isMovement
    }));
  }, [widgets]);
  return /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      variant: "flat",
      className: cx(styles.triggerButton, (isPriceChartActive || isPriceTreeMap || isVolumeTreeMap || isMovement) && styles.triggerButton__active),
      icon: "view-option"
    }, "Infographics"),
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(ToggleWidget, {
    index: 0,
    title: "Price Treemap",
    isActive: isPriceTreeMap,
    toggle: () => {
      togglePriceTreeMap(!isPriceTreeMap);
    }
  }), /*#__PURE__*/React.createElement(ToggleWidget, {
    index: 0,
    title: "Social Volume Treemap",
    isActive: isVolumeTreeMap,
    toggle: () => {
      toggleVolumeTreeMap(!isVolumeTreeMap);
    }
  }), /*#__PURE__*/React.createElement(ToggleWidget, {
    index: 1,
    title: "Price Bar Chart",
    isActive: isPriceChartActive,
    toggle: () => {
      priceToggle(!isPriceChartActive);
    }
  }), /*#__PURE__*/React.createElement(ToggleWidget, {
    index: 2,
    title: "Marketcap & Volume",
    isActive: isMovement,
    toggle: () => {
      movementToggle(!isMovement);
    }
  })));
};

const ToggleWidget = ({
  index,
  isActive,
  toggle,
  title
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.widgetInfo,
    onClick: toggle
  }, SVGs[index], /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, title), /*#__PURE__*/React.createElement(Toggle, {
    isActive: isActive,
    className: cx(styles.toggle, isActive && styles.toggle__active)
  }));
};

const SVGs = [/*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#76E5C2",
  d: "M0 0h7v8H0z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#8358FF",
  d: "M7 0h7v8H7z",
  opacity: ".6"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FFAD4D",
  d: "M0 8h14v6H0z",
  opacity: ".8"
})), /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#89E1C9",
  d: "M0 0h4.7v14H0z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#8358FF",
  d: "M9.3 4H4.6v10h4.7z",
  opacity: ".6"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FFAD4D",
  d: "M9.3 8H14v6H9.3z",
  opacity: ".8"
})), /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#8358FF",
  d: "M7 0h7v14H7z",
  opacity: ".6"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#76E5C2",
  d: "M0 0h7v14H0z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FFAD4D",
  d: "M12.5 2.2l-3.7 8-4-1.6-2.4 3.7-.8-.6 2.7-4.3 4 1.5 3.2-7.1 1 .4z"
}))];
export default Widgets;