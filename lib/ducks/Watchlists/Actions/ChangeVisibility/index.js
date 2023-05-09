const _excluded = ["watchlist"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import Toggle from './Toggle';
import { useUpdateWatchlist } from '../../gql/list/mutations';

const PublicityToggle = _ref => {
  let {
    watchlist
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isActive, setActive] = useState(watchlist.isPublic);
  const [updateWatchlist] = useUpdateWatchlist(watchlist.type);
  return /*#__PURE__*/React.createElement(Toggle, _extends({
    onClick: () => {
      setActive(!isActive);
      updateWatchlist(watchlist, {
        isPublic: !isActive
      });
    },
    isActive: isActive
  }, props));
};

export default PublicityToggle;