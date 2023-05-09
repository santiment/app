const _excluded = ["hiddenColumnIds", "isDesktop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import withSizes from 'react-sizes';
import TrendsTable from '../../ducks/TrendsTable';
import { Column } from '../../ducks/TrendsTable/columns';
import { mapSizesToProps } from '../../utils/withSizes';
const MOBILE_HIDDEN_COLUMNS = [Column.INDEX, Column.CONNECTED_WORDS, Column.SOCIAL_VOLUME];

const Trends = _ref => {
  let {
    hiddenColumnIds,
    isDesktop
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(TrendsTable, _extends({}, props, {
    isDesktop: isDesktop,
    hiddenColumnIds: isDesktop ? hiddenColumnIds : MOBILE_HIDDEN_COLUMNS
  }));
};

export default withSizes(mapSizesToProps)(Trends);