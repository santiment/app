const _excluded = ["data", "scale", "colors", "categories", "domainGroups"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useContext, useState, useEffect } from 'react';
import { updateChartState } from '@santiment-network/chart';
import { linearScale } from '@santiment-network/chart/scales';
import { Plotter, Observer } from './managers';
import { domainModifier } from './domain';
import { clearCtx } from './utils';
import { useRedrawer } from '../../hooks';
export const noop = () => {};
const ChartContext = /*#__PURE__*/React.createContext();
const ChartSetterContext = /*#__PURE__*/React.createContext();
export const ChartProvider = ({
  data,
  scale,
  colors,
  categories,
  domainGroups,
  children
}) => {
  const [chart, _setChart] = useState();
  const [isAwaitingRedraw, redrawChart] = useRedrawer();
  const setChart = useCallback(chart => {
    chart.data = data;
    chart.categories = {};
    chart.scale = scale;
    chart.redraw = redrawChart;
    chart.observer = Observer();
    chart.plotter = Plotter();

    _setChart(chart);
  }, []);
  useEffect(() => {
    if (!chart) return;
    clearCtx(chart);
    chart.data = data;
    chart.scale = scale;
    chart.colors = colors;
    chart.domainGroups = domainGroups;
    chart.categories = categories;

    if (data.length === 0) {
      chart.points = [];
      return;
    }

    updateChartState(chart, data, categories.joinedCategories, domainModifier, domainGroups, new Set(categories.candles));
    chart.plotter.items.forEach(plot => {
      plot(chart, scale, data, colors, categories);
    });
    chart.observer.emit();
  }, [data, scale, colors, domainGroups, isAwaitingRedraw]);
  return /*#__PURE__*/React.createElement(ChartSetterContext.Provider, {
    value: setChart
  }, /*#__PURE__*/React.createElement(ChartContext.Provider, {
    value: chart
  }, children));
};
ChartProvider.defaultProps = {
  scale: linearScale,
  data: []
};
export const useChart = () => useContext(ChartContext);
export const useChartSetter = () => useContext(ChartSetterContext);
export const buildPlotter = plotter => props => {
  plotter(useChart(), props);
  return null;
};
export function usePlotterRemove(chart, id) {
  useEffect(() => {
    chart.redraw();
    return () => {
      chart.plotter.register(id, noop);
      chart.redraw();
    };
  }, []);
}
export const withChartContext = Component => _ref => {
  let {
    data,
    scale,
    colors,
    categories,
    domainGroups
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(ChartProvider, {
    data: data,
    scale: scale,
    colors: colors,
    categories: categories,
    domainGroups: domainGroups
  }, /*#__PURE__*/React.createElement(Component, props));
};