function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Modal from '@santiment-network/ui/Modal';
import PriceBlock from './MobileAssetPriceInfo';
import MobileAssetChart from './MobileAssetChart';
import Title from './MobileAssetTitle';
import ChartMetricsTool from '../../../ducks/SANCharts/ChartMetricsTool';
import ExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip';
import MobileAssetChartSelector from './MobileAssetChartSelector';
import styles from './MobileFullscreenChart.module.css';

const checkLandscapeMode = () => Math.abs(window.orientation) === 90;

const MobileFullscreenChart = ({
  isOpen,
  toggleOpen,
  project,
  timeRange,
  onChangeTimeRange,
  chartProps,
  metricsToolProps
}) => {
  const [landscapeMode, setLandscapeMode] = useState(checkLandscapeMode());

  const setOrientation = () => setLandscapeMode(checkLandscapeMode());

  useEffect(() => {
    window.addEventListener('orientationchange', setOrientation);
    return () => {
      window.removeEventListener('orientationchange', setOrientation);
    };
  });

  const toggleFullScreen = isOpen => {
    toggleOpen(isOpen);

    if (document.body.requestFullscreen) {
      if (isOpen) {
        document.body.requestFullscreen();
        window.screen.orientation.lock('landscape-primary').then(() => setLandscapeMode(true)).catch(setOrientation);
      } else {
        if (landscapeMode) {
          window.screen.orientation.unlock();
        }

        document.exitFullscreen().catch(err => console.log(err));
      }
    } else {
      setOrientation();
    }
  };

  return /*#__PURE__*/React.createElement(ExplanationTooltip, {
    className: styles.tooltip,
    localStorageSuffix: "MOBILE_FULLSCREEN_CHART",
    align: "end",
    position: "top",
    dismissOnTouch: true,
    title: "Open this chart in fullscreen mode to analyze it in more details",
    description: "",
    delay: 20000
  }, /*#__PURE__*/React.createElement(Modal, {
    trigger: /*#__PURE__*/React.createElement(Icon, {
      type: "fullscreen-arrows",
      className: styles.icon,
      onClick: () => {
        toggleFullScreen(true);
      }
    }),
    classes: {
      wrapper: styles.modal
    },
    open: isOpen
  }, closeModal => /*#__PURE__*/React.createElement("section", {
    className: cx(styles.wrapper, !landscapeMode && styles.dark)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      toggleFullScreen(false);
      closeModal();
    },
    className: cx(styles.button)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium"
  })), landscapeMode && /*#__PURE__*/React.createElement(Title, {
    slug: project.name,
    ticker: project.ticker
  })), landscapeMode ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PriceBlock, project), /*#__PURE__*/React.createElement(MobileAssetChart, chartProps), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, /*#__PURE__*/React.createElement(MobileAssetChartSelector, {
    onChangeTimeRange: onChangeTimeRange,
    timeRange: timeRange,
    isFullscreen: true,
    className: styles.selector
  }), /*#__PURE__*/React.createElement(ChartMetricsTool, _extends({}, metricsToolProps, {
    addMetricBtnText: "Add up to 3 metrics",
    className: styles.metricsPopup
  })))) : /*#__PURE__*/React.createElement("span", {
    className: styles.message
  }, "Please, turn your phone horizontally and unlock rotation to see a fullscreen chart"))));
};

export default MobileFullscreenChart;