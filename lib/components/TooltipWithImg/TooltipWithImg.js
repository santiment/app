const _excluded = ["tooltipEl", "mark", "onHide", "children", "img", "description", "className", "title", "as"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import SidecarExplanationTooltip from '../../ducks/SANCharts/SidecarExplanationTooltip';
import tooltipStyles from './../../ducks/SANCharts/SidecarExplanationTooltip.module.css';
import styles from './TooltipWithImg.module.css';

const CloseTrigger = ({
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  className: cx(tooltipStyles.btn, styles.tooltipClose)
}, /*#__PURE__*/React.createElement(Icon, {
  type: "close-medium",
  className: styles.closeIcon
}));

const TooltipWithImg = _ref => {
  let {
    tooltipEl: TooltipEl = SidecarExplanationTooltip,
    mark,
    onHide,
    children,
    img: tooltipImage,
    description,
    className,
    title,
    as = Fragment
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(TooltipEl, _extends({
    as: as,
    closeTimeout: 500,
    localStorageSuffix: mark,
    position: "top",
    onHide: onHide,
    classes: styles,
    className: cx(styles.tooltip, className),
    closeEl: CloseTrigger,
    arrowOffset: 32,
    content: /*#__PURE__*/React.createElement("div", {
      className: styles.content
    }, title && /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, title), /*#__PURE__*/React.createElement("img", {
      src: tooltipImage,
      alt: "Tooltip",
      className: styles.img
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.description
    }, description)),
    description: "",
    withArrow: true,
    delay: 0
  }, rest), children);
};

export default TooltipWithImg;