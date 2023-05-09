import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import StudioTabsKeyStats from '../../../ducks/Studio/Tabs/KeyStats';

const KeyStatsTab = ({
  settings
}) => {
  const [target, setTarget] = useState();
  useEffect(() => {
    setTarget(document.querySelector('.studio-screen'));
  }, []);
  return target ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(StudioTabsKeyStats, {
    slug: settings.slug
  }), target) : null;
};

export default KeyStatsTab;