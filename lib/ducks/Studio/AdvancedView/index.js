const _excluded = ["advancedView", "toggleAdvancedView"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import PriceHistogram from './PriceHistogram';
import SocialContext from './SocialContext';
import styles from './index.module.css';
const Components = {
  'Spent Coin Cost': PriceHistogram,
  'Social Context': SocialContext
};
export default (_ref => {
  let {
    advancedView,
    toggleAdvancedView
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const El = Components[advancedView];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.toggle,
    onClick: () => toggleAdvancedView()
  }, El.Icon, " ", /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right",
    className: styles.arrow
  })), /*#__PURE__*/React.createElement(El, rest));
});