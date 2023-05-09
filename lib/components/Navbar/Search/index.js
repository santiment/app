const _excluded = ["onKeyDown"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { push } from 'react-router-redux';
import UISearch from '@santiment-network/ui/Search';
import { track } from 'webkit/analytics';
import Suggestions from './Suggestions';
import { useCursorNavigation } from './navigation';
import { addRecent } from './RecentsCategory';
import { store } from '../../../redux';
import { getPageType } from '../../../withTracker';
import styles from './index.module.css';
const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);

const Search = () => {
  const inputRef = useRef();
  const [isOpened, setIsOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const _useCursorNavigation = useCursorNavigation(isOpened, onSuggestionSelect),
        {
    onKeyDown
  } = _useCursorNavigation,
        props = _objectWithoutProperties(_useCursorNavigation, _excluded);

  useEffect(() => {
    if (!searchTerm) return;
    const timer = setTimeout(() => track.event('navbar_search', {
      value: searchTerm,
      source: getPageType(window.location.pathname),
      source_url: window.location.href
    }), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    function onKeyPress(e) {
      const {
        code,
        target
      } = e;

      if (code === 'Slash' && !EDITABLE_TAGS.has(target.tagName) && !target.isContentEditable) {
        e.preventDefault();
        openSuggestions();
        input.focus();
      }
    }

    window.addEventListener('keypress', onKeyPress);
    return () => window.removeEventListener('keypress', onKeyPress);
  }, []);

  function openSuggestions() {
    setIsOpened(true);
  }

  function closeSuggestions() {
    setIsOpened(false);
  }

  function onSuggestionSelect(node, item, category) {
    const href = node.getAttribute('href');
    addRecent(category, item);
    closeSuggestions();

    if (href.startsWith('http')) {
      window.location.href = href;
    } else {
      store.dispatch(push(href));
    }
  }

  return /*#__PURE__*/React.createElement(UISearch, {
    className: cx(styles.search, isOpened && styles.search_focused),
    inputClassName: styles.input,
    forwardedRef: inputRef,
    placeholder: "Search for assets, trends, etc...",
    autoComplete: "off",
    onChange: v => setSearchTerm(v),
    onClick: openSuggestions,
    onBlur: closeSuggestions,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(Suggestions, _extends({}, props, {
    searchTerm: searchTerm,
    isOpened: isOpened,
    onSuggestionSelect: onSuggestionSelect
  })));
};

export default Search;