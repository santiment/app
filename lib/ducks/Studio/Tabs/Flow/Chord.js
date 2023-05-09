const _excluded = ["ticker", "matrix", "isLoading", "isEmpty"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import { Chord as NivoChord } from '@nivo/chord';
import Loader from '@santiment-network/ui/Loader/Loader';
import { LABELS } from './matrix';
import { format } from './utils';
import styles from './index.module.css';
const MARGIN = {
  top: 35,
  right: 35,
  bottom: 35,
  left: 35
};
const BORDER_COLOR = {
  from: 'color',
  modifiers: [['darker', 0.4]]
};
const TEXT_COLOR = {
  from: 'color',
  modifiers: [['darker', 1]]
};

const Chord = _ref => {
  let {
    ticker,
    matrix,
    isLoading,
    isEmpty
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const isLoaded = !isLoading;
  const formatter = useCallback(value => format(ticker, value), [ticker]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.chord
  }, isLoading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.overlay
  }), isLoaded && isEmpty && /*#__PURE__*/React.createElement("div", {
    className: styles.overlay
  }, "No data for this date"), /*#__PURE__*/React.createElement(NivoChord, _extends({
    enableLabel: true,
    isInteractive: true,
    keys: LABELS,
    margin: MARGIN,
    padAngle: 0.02,
    innerRadiusRatio: 0.95,
    arcBorderColor: BORDER_COLOR,
    ribbonBorderColor: BORDER_COLOR,
    labelTextColor: TEXT_COLOR,
    arcHoverOthersOpacity: 0.2,
    ribbonHoverOpacity: 1,
    ribbonHoverOthersOpacity: 0.2,
    motionStiffness: 300,
    motionDamping: 40,
    animate: isLoaded
  }, props, {
    matrix: matrix,
    valueFormat: formatter
  })));
};

Chord.defaultProps = {
  width: 600,
  height: 600,
  colors: {
    scheme: 'nivo'
  }
};
export default Chord;