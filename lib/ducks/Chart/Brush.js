function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useState, useEffect } from 'react';
import { initBrush, updateBrushState, updateBrushDimensions } from '@santiment-network/chart/brush';
import { useChart } from './context';
import { dayBrushPaintConfig, nightBrushPaintConfig } from './paintConfigs';
import { clearCtx } from './utils';
import { useRedrawer } from '../../hooks';
import { useTheme } from '../../stores/ui/theme';
import { brush as brushClassName } from './index.module.css';
const BRUSH_HEIGHT = 40;

const noop = () => {};

function getBrushPlotItems({
  items
}) {
  const brushItems = new Map(items);
  brushItems.delete('cartesianGrid');
  brushItems.delete('axes');
  brushItems.delete('watermark');
  brushItems.delete('lastDayPrice');
  brushItems.delete('Drawer');
  brushItems.delete('candles');
  return brushItems;
}

const Brush = ({
  data,
  categories,
  scale,
  colors,
  domainGroups,
  from,
  to,
  onChangeEnd
}) => {
  const chart = useChart();
  const {
    isNightMode
  } = useTheme();
  const [brush, setBrush] = useState();
  const [isAwaitingRedraw, requestRedraw] = useRedrawer();

  if (brush) {
    brush.onChangeEnd = onChangeEnd;
  }

  useEffect(() => {
    const width = chart.canvasWidth;
    const brush = initBrush(chart, width, BRUSH_HEIGHT, dayBrushPaintConfig);
    brush.canvas.classList.add(brushClassName);
    brush.plotBrushData = noop;
    brush.redraw = noop;

    brush.updateWidth = width => {
      updateBrushDimensions(brush, width, BRUSH_HEIGHT);
      brush.redraw();
    };

    chart.brush = brush;
    setBrush(brush);
  }, []);
  useEffect(() => {
    const {
      length
    } = data;

    if (brush && length) {
      const lastIndex = length - 1;
      let {
        startIndex = 0,
        endIndex = lastIndex
      } = brush;
      const {
        datetime: startTimestamp
      } = data[0];
      const {
        datetime: endTimestamp
      } = data[lastIndex];
      const fromTimestamp = +new Date(from);
      const toTimestamp = +new Date(to);
      const scale = length / (endTimestamp - startTimestamp);

      if (!data[startIndex] || fromTimestamp !== data[startIndex].datetime) {
        startIndex = Math.trunc(scale * (fromTimestamp - startTimestamp));
      }

      if (!data[endIndex] || toTimestamp !== data[endIndex].datetime) {
        endIndex = Math.trunc(scale * (toTimestamp - startTimestamp));
      }

      startIndex = startIndex > 0 ? startIndex < length ? startIndex : lastIndex : 0;
      endIndex = endIndex > 0 ? endIndex < length ? endIndex : lastIndex : 0;

      if (endIndex - startIndex < 2) {
        if (startIndex > 2) {
          startIndex -= 2;
        } else {
          endIndex += 2;
        }
      }

      brush.startIndex = startIndex;
      brush.endIndex = endIndex;
      requestRedraw();
    }
  }, [brush, data, from, to]);
  useEffect(() => {
    if (!brush) return;
    clearCtx(brush);
    brush.paintConfig = isNightMode ? nightBrushPaintConfig : dayBrushPaintConfig;
    if (data.length === 0) return;

    const brushCategories = _objectSpread({}, categories);

    brushCategories.lines = [...categories.lines, ...categories.candles];

    brush.plotBrushData = () => getBrushPlotItems(chart.plotter).forEach(plot => {
      plot(brush, scale, data, colors, brushCategories);
    });

    brush.redraw = () => updateBrushState(brush, data, categories.joinedCategories);

    brush.redraw();
  }, [brush, data, colors, domainGroups, isNightMode, isAwaitingRedraw]);
  return null;
};

export default Brush;