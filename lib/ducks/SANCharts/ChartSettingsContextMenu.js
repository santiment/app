const _excluded = ["className"],
      _excluded2 = ["className", "disabled"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Toggle from '@santiment-network/ui/Toggle';
import UIButton from '@santiment-network/ui/Button';
import UIIcon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel/Panel';
import { ProLabel } from '../../components/ProLabel';
import ShareModalTrigger from '../../components/Share/ShareModalTrigger';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import ChartDownloadBtn from './ChartDownloadBtn';
import DownloadCSVBtn from './DownloadCSVBtn';
import styles from './ChartPage.module.css';

const ShareChart = ({
  trigger,
  shareLink
}) => /*#__PURE__*/React.createElement(ShareModalTrigger, {
  trigger: trigger,
  classes: styles,
  shareLink: shareLink
});

export const Icon = _ref => {
  let {
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(UIIcon, _extends({}, props, {
    className: cx(styles.icon, className)
  }));
};
export const Button = _ref2 => {
  let {
    className,
    disabled
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(UIButton, _extends({}, props, {
    disabled: disabled,
    fluid: true,
    variant: disabled ? 'flat' : 'ghost',
    className: cx(styles.context__btn, className)
  }));
};
export const ShareButton = ({
  shareLink,
  onMouseDown
}) => /*#__PURE__*/React.createElement(ShareChart, {
  shareLink: shareLink,
  trigger: props => /*#__PURE__*/React.createElement(UIButton, _extends({
    fluid: true,
    variant: "ghost"
  }, props, {
    onMouseDown: onMouseDown
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "share"
  }), "Share chart")
});
export const Setting = ({
  title,
  isActive,
  onClick
}) => /*#__PURE__*/React.createElement(Button, {
  className: styles.context__btn,
  onClick: onClick
}, title, /*#__PURE__*/React.createElement(Toggle, {
  isActive: isActive,
  className: styles.context__toggle
}));
export const Menu = ({
  children,
  className
}) => /*#__PURE__*/React.createElement(ContextMenu, {
  trigger: /*#__PURE__*/React.createElement(UIButton, {
    variant: "flat",
    className: cx(className, styles.settingsBtn)
  }, /*#__PURE__*/React.createElement(UIIcon, {
    type: "settings"
  })),
  passOpenStateAs: "isActive",
  position: "bottom",
  align: "end"
}, /*#__PURE__*/React.createElement(Panel, {
  variant: "modal",
  className: styles.context
}, children));

const ChartSettingsContextMenu = ({
  chartRef,
  shareLink,
  title,
  showDownload = true,
  showDownloadPNG,
  classes = {},
  isLogScale,
  onScaleChange,
  data,
  events,
  activeMetrics,
  activeEvents,
  isCartesianGridActive,
  onCartesianGridChange,
  isClosestDataActive,
  onClosestDataChange,
  showWatermarkSettings = true,
  onWatermarkLighterChange,
  isWatermarkLighter,
  onWatermarkVisibilityChange,
  isWatermarkVisible,
  MetricNode,
  children
}) => {
  const {
    isPro,
    isProPlus
  } = useUserSubscriptionStatus();
  const isFree = !isPro;
  const showDivider = showDownload && showDownloadPNG || children;
  return /*#__PURE__*/React.createElement(ContextMenu, {
    trigger: /*#__PURE__*/React.createElement(UIButton, {
      variant: "flat",
      className: cx(classes.settingsBtn, styles.settingsBtn)
    }, /*#__PURE__*/React.createElement(UIIcon, {
      type: "settings"
    })),
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end"
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    className: styles.context
  }, onScaleChange && /*#__PURE__*/React.createElement(Button, {
    onClick: onScaleChange
  }, "Log scale", /*#__PURE__*/React.createElement(Toggle, {
    isActive: isLogScale,
    className: styles.context__toggle
  })), onCartesianGridChange && /*#__PURE__*/React.createElement(Button, {
    onClick: onCartesianGridChange
  }, "Cartesian grid", /*#__PURE__*/React.createElement(Toggle, {
    isActive: isCartesianGridActive,
    className: styles.context__toggle
  })), onClosestDataChange && /*#__PURE__*/React.createElement(Button, {
    onClick: onClosestDataChange,
    className: cx(styles.context__btn, styles.context__btn_big)
  }, "Show closest data on hover", /*#__PURE__*/React.createElement(Toggle, {
    isActive: isClosestDataActive,
    className: styles.context__toggle
  })), showWatermarkSettings && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: onWatermarkLighterChange,
    disabled: isFree,
    className: styles.context__btn
  }, "Make watermark less visible", isPro ? /*#__PURE__*/React.createElement(Toggle, {
    isActive: isWatermarkLighter,
    className: styles.context__toggle
  }) : /*#__PURE__*/React.createElement(ProLabel, null)), /*#__PURE__*/React.createElement(Button, {
    onClick: onWatermarkVisibilityChange,
    disabled: !isProPlus,
    className: styles.context__btn
  }, "Hide watermark", isProPlus ? /*#__PURE__*/React.createElement(Toggle, {
    isActive: !isWatermarkVisible,
    className: styles.context__toggle
  }) : /*#__PURE__*/React.createElement(ProLabel, {
    isPlus: true
  }))), shareLink && /*#__PURE__*/React.createElement(ShareButton, {
    shareLink: shareLink
  }), showDivider && /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  }), showDownload && /*#__PURE__*/React.createElement(DownloadCSVBtn, {
    fluid: true,
    variant: "ghost",
    title: title,
    data: data,
    disabled: isFree,
    events: events,
    activeEvents: activeEvents,
    activeMetrics: activeMetrics,
    className: styles.context__btn
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.context__btn_icon_and_name
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "save"
  }), "Download as CSV"), isFree && /*#__PURE__*/React.createElement(ProLabel, null)), showDownloadPNG && /*#__PURE__*/React.createElement(ChartDownloadBtn, {
    fluid: true,
    variant: "ghost",
    metrics: activeMetrics,
    data: data,
    title: title,
    chartRef: chartRef,
    MetricNode: MetricNode
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "save"
  }), "Download as PNG"), children));
};

export default ChartSettingsContextMenu;