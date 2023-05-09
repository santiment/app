const _excluded = ["data", "layout"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useMemo } from 'react';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../../utils/withSizes';
import ProjectsBarHorizontalChart from './ProjectsBarHorizontalChart';
import ProjectsBarVerticalChart from './ProjectsBarVerticalChart';
import { useChartColors } from '../../Chart/colors';
import { PREDEFINED_COLORS } from './utils';

const ProjectsBarChartWrapper = _ref => {
  let {
    data,
    layout = 'horizontal'
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const onProjectClick = useCallback(e => {
    const {
      value,
      index
    } = e;
    const {
      clickable = true
    } = index ? data[index] : e;

    if (!clickable) {
      return;
    }

    window.open(`/projects/${value}`, '_blank');
  }, [data]);
  const metrics = useMemo(() => {
    return data.map(item => ({
      key: item.slug || item.address
    }));
  }, [data]);
  const MetricColor = useChartColors(metrics, PREDEFINED_COLORS);
  return layout === 'horizontal' ? /*#__PURE__*/React.createElement(ProjectsBarHorizontalChart, _extends({
    onProjectClick: onProjectClick,
    MetricColor: MetricColor,
    data: data
  }, rest)) : /*#__PURE__*/React.createElement(ProjectsBarVerticalChart, _extends({
    onProjectClick: onProjectClick,
    MetricColor: MetricColor,
    data: data
  }, rest));
};

export default withSizes(mapSizesToProps)(ProjectsBarChartWrapper);