import React from 'react';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import { ProjectsChartTooltip } from '../../../SANCharts/tooltip/CommonChartTooltip';
import ColorsExplanation, { COLOR_MAPS } from './ColorsExplanation';
import NoDataCharts from './NoDataCharts';
import { useProjectRanges, useWithColors } from './hooks';
import { getTooltipLabels, INFOGRAPHICS, tooltipLabelFormatter } from './utils';
import CustomizedTreeMapContent from './CustomizedTreeMapContent';
import { InfographicTitleRanges, PriceInfographicTitleRanges, useInfographicRanges } from './InfographicTitles';
import styles from './ProjectsChart.module.css';
export const ProjectsTreeMap = ({
  listId,
  ranges,
  className,
  title,
  settings,
  onChangeSettings,
  sortByMetric,
  type
}) => {
  const {
    currency: defaultCurrency
  } = settings;
  const {
    currentRanges,
    currency,
    setCurrency
  } = useInfographicRanges({
    onChangeSettings,
    type,
    ranges,
    defaultCurrency
  });
  const isSocialVolume = type === INFOGRAPHICS.SOCIAL_VOLUME_TREE_MAP;
  const {
    data,
    loading,
    intervalIndex,
    setIntervalIndex,
    label,
    key
  } = useProjectRanges({
    listId,
    ranges: currentRanges,
    isSocialVolume,
    settings,
    onChangeSettings,
    sortByMetric,
    type
  });
  const noData = !loading && data.length === 0;
  const colored = useWithColors(data, key);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, isSocialVolume ? /*#__PURE__*/React.createElement(InfographicTitleRanges, {
    type: "Treemap",
    setIntervalIndex: setIntervalIndex,
    ranges: currentRanges,
    label: label,
    intervalIndex: intervalIndex,
    title: title
  }) : /*#__PURE__*/React.createElement(PriceInfographicTitleRanges, {
    title: title,
    type: "Treemap",
    intervalIndex: intervalIndex,
    label: label,
    ranges: currentRanges,
    setIntervalIndex: setIntervalIndex,
    currency: currency,
    setCurrency: setCurrency
  })), loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Skeleton, {
    className: styles.treeMap__skeletonTop,
    show: loading,
    repeat: 1
  }), /*#__PURE__*/React.createElement(Skeleton, {
    className: styles.treeMap__skeletonBottom,
    show: loading,
    repeat: 1
  })), noData ? /*#__PURE__*/React.createElement("div", {
    className: styles.noDataTreeMap
  }, /*#__PURE__*/React.createElement(NoDataCharts, null)) : !loading ? /*#__PURE__*/React.createElement("div", {
    className: styles.treeMap
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(Treemap, {
    data: colored,
    dataKey: 'marketcapUsd',
    fill: "var(--jungle-green)",
    isAnimationActive: false,
    content: /*#__PURE__*/React.createElement(CustomizedTreeMapContent, {
      dataKey: key
    })
  }, /*#__PURE__*/React.createElement(Tooltip, {
    offset: 5,
    allowEscapeViewBox: {
      x: false,
      y: true
    },
    content: /*#__PURE__*/React.createElement(ProjectsChartTooltip, {
      className: styles.treemapTooltip,
      labelFormatter: tooltipLabelFormatter,
      payloadLabels: getTooltipLabels({
        key,
        label: title
      })
    })
  }))), /*#__PURE__*/React.createElement(ColorsExplanation, {
    colorMaps: COLOR_MAPS,
    range: label
  })) : null);
};