import React from 'react';
import { Menu, Setting } from '../../SANCharts/ChartSettingsContextMenu';
import styles from './index.module.css';

const SettingsMenu = ({
  settings,
  chartAssets,
  priceAssets,
  isLog,
  togglePriceAsset,
  setIsLog
}) => /*#__PURE__*/React.createElement(Menu, {
  className: styles.menu
}, /*#__PURE__*/React.createElement(Setting, {
  title: "Log scale",
  isActive: isLog,
  onClick: () => setIsLog(!isLog)
}), chartAssets.length > 0 && /*#__PURE__*/React.createElement("hr", {
  className: styles.divider
}), chartAssets.map(({
  slug
}) => /*#__PURE__*/React.createElement(Setting, {
  key: slug,
  title: `Price of ${slug}`,
  isActive: priceAssets.includes(slug),
  onClick: () => togglePriceAsset(slug)
})));

export default SettingsMenu;