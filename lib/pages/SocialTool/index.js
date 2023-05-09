const _excluded = ["settings", "options"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import SocialTool from '../../ducks/SocialTool';
import withBoundaries from '../Studio/withBoundaries';
import { parseUrl } from '../../ducks/Studio/url/parse';
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from '../../ducks/SocialTool/defaults';
export default withBoundaries(_ref => {
  let {
    settings,
    options
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const sharedState = parseUrl(window.location.search, DEFAULT_SETTINGS, DEFAULT_OPTIONS);

  _extends(sharedState.settings, settings);

  _extends(sharedState.options, options);

  return /*#__PURE__*/React.createElement(SocialTool, _extends({}, props, sharedState));
});