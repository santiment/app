import React, { useState, useEffect } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Toggle from '@santiment-network/ui/Toggle';
import Timer from '../Timer';
import { dateDifferenceInWords } from '../../utils/dates';
import { getSavedToggle, saveToggle } from '../../utils/localStorage';
import DarkTooltip from '../Tooltip/DarkTooltip';
import styles from './Refresh.module.css';
const KEY = 'TABLE_REFRESH';
const INTERVAL = 1000 * 60;

const Refresh = ({
  onRefreshClick,
  timestamp,
  isLoading
}) => {
  const options = {
    from: new Date(timestamp)
  };
  const [autoRefresh, setAutoRefresh] = useState(getSavedToggle(KEY));
  const [timer, setTimer] = useState(null);

  function toggleAutoRefreshState() {
    saveToggle(KEY, !autoRefresh);
    setAutoRefresh(!autoRefresh);
  }

  useEffect(() => {
    if (!autoRefresh) {
      clearInterval(timer);
      return;
    }

    const id = setInterval(onRefreshClick, INTERVAL * 3);
    setTimer(id);
    return () => clearInterval(id);
  }, [autoRefresh, onRefreshClick]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onRefreshClick,
    className: styles.refresh
  }, /*#__PURE__*/React.createElement(DarkTooltip, {
    position: "top",
    align: "center",
    on: "hover",
    className: styles.deprecated__tooltip,
    trigger: /*#__PURE__*/React.createElement(Icon, {
      type: "refresh",
      className: styles.icon
    })
  }, /*#__PURE__*/React.createElement(Timer, {
    interval: INTERVAL,
    syncRef: timestamp
  }, () => isLoading ? 'Loading...' : timestamp ? `Updated ${dateDifferenceInWords(options)}` : ''))), /*#__PURE__*/React.createElement("div", {
    className: styles.auto,
    onClick: toggleAutoRefreshState
  }, /*#__PURE__*/React.createElement(Toggle, {
    isActive: autoRefresh,
    className: styles.toggle
  }), "Auto refresh"));
};

export default Refresh;