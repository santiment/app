const _excluded = ["suggestionsRef", "isOpened", "isTablet", "isLaptop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { CSSTransition } from 'react-transition-group';
import RecentsCategory, { getRecents, clearRecents } from './RecentsCategory';
import AssetsCategory from './AssetsCategory';
import WalletsCategory from './WalletsCategory';
import TrendingWordsCategory from './TrendingWordsCategory';
import InsightsCategory from './InsightsCategory';
import PeopleCategory from './PeopleCategory';
import { mapSizesToProps } from '../../../utils/withSizes';
import styles from './Suggestions.module.css';
const DEFAULT_RECENTS = [];

const Suggestions = _ref => {
  let {
    suggestionsRef,
    isOpened,
    isTablet,
    isLaptop
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const isNotSearched = !props.searchTerm;
  const [recents, setRecents] = useState(DEFAULT_RECENTS);
  useEffect(() => {
    if (isNotSearched) {
      if (isOpened) {
        setRecents(getRecents().slice(0, 5));
      }
    } else {
      setRecents(DEFAULT_RECENTS);
    }
  }, [isOpened, isNotSearched]);
  useEffect(() => {
    const dropdown = suggestionsRef.current;

    if (isOpened && dropdown) {
      const {
        parentNode
      } = dropdown;
      const dropdownWidth = dropdown.offsetWidth;
      const availableWidth = parentNode.clientWidth + parseFloat(getComputedStyle(parentNode).marginLeft);
      dropdown.style.minWidth = (dropdownWidth > availableWidth ? dropdownWidth : availableWidth) + 'px';
      const isSmallScreen = isTablet || isLaptop;
      dropdown.style.right = isSmallScreen ? availableWidth + 40 + 'px' : availableWidth / 2 + 'px';
    }
  }, [isOpened]);

  function onRecentsClear() {
    clearRecents();
    setRecents(DEFAULT_RECENTS);
  }

  return /*#__PURE__*/React.createElement(CSSTransition, {
    in: isOpened,
    timeout: 500,
    classNames: styles
  }, /*#__PURE__*/React.createElement("div", {
    ref: suggestionsRef,
    className: cx(styles.dropdown, styles.exitDone)
  }, /*#__PURE__*/React.createElement(RecentsCategory, _extends({}, props, {
    items: recents,
    onClear: onRecentsClear
  })), /*#__PURE__*/React.createElement(AssetsCategory, props), /*#__PURE__*/React.createElement(WalletsCategory, props), /*#__PURE__*/React.createElement(TrendingWordsCategory, props), /*#__PURE__*/React.createElement(InsightsCategory, props), recents.length === 0 && /*#__PURE__*/React.createElement(PeopleCategory, props)));
};

export default withSizes(mapSizesToProps)(Suggestions);