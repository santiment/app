import React from 'react';
import { capitalizeStr } from '../../../utils/utils';
import styles from './MobileAssetTitle.module.css';

const MobileAssetTitle = ({
  slug,
  ticker
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
  className: styles.name
}, capitalizeStr(slug)), ticker && /*#__PURE__*/React.createElement("span", {
  className: styles.ticker
}, "(", ticker.toUpperCase(), ")"));

export default MobileAssetTitle;