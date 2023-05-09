const _excluded = ["onChange"],
      _excluded2 = ["onChange"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Checkbox from './index';
import PopupBanner from '../../../components/banners/feature/PopupBanner';
import { useUser } from '../../../stores/user';
export const CHECKBOX_COLUMN = {
  id: 'Checkboxes',
  Header: ({
    getToggleAllRowsSelectedProps
  }) => {
    const {
      isLoggedIn
    } = useUser();

    const _getToggleAllRowsSele = getToggleAllRowsSelectedProps(),
          {
      onChange
    } = _getToggleAllRowsSele,
          rest = _objectWithoutProperties(_getToggleAllRowsSele, _excluded);

    function handleChange(e) {
      if (isLoggedIn) onChange(e);
    }

    return /*#__PURE__*/React.createElement(PopupBanner, null, /*#__PURE__*/React.createElement(Checkbox, _extends({}, rest, {
      onChange: handleChange
    })));
  },
  Cell: ({
    row
  }) => {
    const {
      isLoggedIn
    } = useUser();

    const _row$getToggleRowSele = row.getToggleRowSelectedProps(),
          {
      onChange
    } = _row$getToggleRowSele,
          rest = _objectWithoutProperties(_row$getToggleRowSele, _excluded2);

    function handleChange(e) {
      if (isLoggedIn) onChange(e);
    }

    return /*#__PURE__*/React.createElement(PopupBanner, null, /*#__PURE__*/React.createElement(Checkbox, _extends({}, rest, {
      onChange: handleChange
    })));
  },
  disableSortBy: true,
  collapse: true
};