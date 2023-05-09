import React, { useState } from 'react';
import cx from 'classnames';
import { ProLabel } from '../../../../../components/ProLabel';
import Toggle from '../../../../../components/VisibilityIndicator/Toggle';
import Guide from '../Guide/Guide';
import Cabinet from '../Cabinet/Cabinet';
import styles from './CabinetPreview.module.css';
const TABS = {
  GUIDE: 0,
  CABINET: 1
};
const TOGGLE_KEY = 'CABINET-TOGGLE-KEY';

const updateState = () => localStorage.getItem(TOGGLE_KEY) === 'true';

const CabinetPreview = () => {
  const [tab, setTab] = useState(TABS.CABINET);
  const [hidden, setHidden] = useState(updateState);

  function toggle() {
    const newValue = !hidden;
    setHidden(newValue);
    localStorage.setItem(TOGGLE_KEY, newValue);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.tab, tab === TABS.CABINET && styles.active),
    onClick: () => setTab(TABS.CABINET)
  }, "Cabinet", /*#__PURE__*/React.createElement(ProLabel, {
    className: styles.pro
  })), /*#__PURE__*/React.createElement(Toggle, {
    isActive: !hidden,
    className: styles.toggle,
    onClick: toggle
  })), !hidden && /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, tab === TABS.GUIDE && /*#__PURE__*/React.createElement(Guide, null), tab === TABS.CABINET && /*#__PURE__*/React.createElement(Cabinet, null)));
};

export default CabinetPreview;