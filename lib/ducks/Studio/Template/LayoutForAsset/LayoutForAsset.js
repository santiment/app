const _excluded = ["markedAsNew", "hideMarkedAsNew", "counter", "className"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import LoadTemplate from '../Dialog/LoadTemplate';
import { useUserTemplates } from '../gql/hooks';
import layoutsTooltipImg from './../../../../assets/tooltips/screener-layouts-bg.jpg';
import DarkTooltip from '../../../../components/Tooltip/DarkTooltip';
import TooltipWithImg from '../../../../components/TooltipWithImg/TooltipWithImg';
import { useUser } from '../../../../stores/user';
import { ForceClosableExplanationTooltip } from '../../../SANCharts/SidecarExplanationTooltip';
import styles from './LayoutForAsset.module.css';
export const EXPLANATION_TOOLTIP_MARK = '_ASSET_CHART_LAYOUTS_ROW';

const RowTooltipBuilder = ({
  onHide
}) => ({
  children
}) => {
  const [shown, setShown] = useState(true);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.tooltipWrapper
  }, /*#__PURE__*/React.createElement(TooltipWithImg, {
    shown: shown,
    mark: EXPLANATION_TOOLTIP_MARK,
    onHide: onHide,
    img: layoutsTooltipImg,
    className: styles.explanation,
    tooltipEl: ForceClosableExplanationTooltip,
    description: "Choose from a list of existing chart layouts that you can apply for the selected asset. Use one of our community-made templates or create your own!"
  }, /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
    onClick: () => setShown(false)
  }, children));
};

const IconTooltipWrapper = ({
  children,
  className,
  index
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.tooltipWrapper, className)
  }, /*#__PURE__*/React.createElement(DarkTooltip, {
    closeTimeout: 0,
    align: "start",
    position: index === 1 ? 'bottom' : 'top',
    description: "",
    closable: false,
    delay: 500,
    withArrow: false,
    offsetY: 3,
    className: styles.tooltipContainer,
    trigger: children
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.iconTooltip, styles.tooltip)
  }, "Click to apply chart layout")));
};

const Trigger = _ref => {
  let {
    markedAsNew,
    hideMarkedAsNew,
    counter,
    className
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  let Wrapper = useMemo(() => {
    return markedAsNew ? RowTooltipBuilder({
      onHide: () => markedAsNew && hideMarkedAsNew(false)
    }) : IconTooltipWrapper;
  }, [markedAsNew, hideMarkedAsNew]);
  return /*#__PURE__*/React.createElement(Wrapper, {
    className: className,
    index: counter
  }, /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: cx(styles.counterContainer, markedAsNew && styles.hovered, 'assets-table-row-tooltip')
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "chart-layout",
    className: styles.icon
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.counter
  }, counter)));
};

const LayoutForAsset = ({
  item: {
    id
  },
  hide,
  markedAsNew,
  index,
  className
}) => {
  const {
    user
  } = useUser();
  const [templates] = useUserTemplates(user ? user.id : undefined);
  return /*#__PURE__*/React.createElement(LoadTemplate, {
    trigger: /*#__PURE__*/React.createElement(Trigger, {
      className: className,
      counter: index,
      markedAsNew: markedAsNew,
      hideMarkedAsNew: hide
    }),
    templates: templates,
    asProject: id,
    isFeatured: true,
    asLink: true
  });
};

export default LayoutForAsset;