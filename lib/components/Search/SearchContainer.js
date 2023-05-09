const _excluded = ["history", "isMobile", "className", "selectedTab", "inputProps"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import SearchProjects from './SearchProjects';
import { TABS } from './tabs';
import TrendsSearchForm from '../Trends/Search';
import { getRecentAssets, addRecentAssets, removeRecentAssets, clearRecentAssets } from '../../utils/recent';
import styles from './SearchContainer.module.css';
const RECENT_ASSETS = 'Recently searched';
const ASSETS = 'Assets';
const TRENDING_WORDS = 'Trending words';
const INPUT_ID = 'projects-search';
const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);
const INPUT_ID_PROPS = {
  id: INPUT_ID
};

const Recent = ({
  icon = 'clock',
  text,
  onRemove
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.recent
}, /*#__PURE__*/React.createElement("div", {
  className: styles.left
}, /*#__PURE__*/React.createElement(Icon, {
  type: icon,
  className: styles.clock
}), text), /*#__PURE__*/React.createElement(Icon, {
  type: "close-medium",
  className: styles.remove,
  onClick: onRemove
}));

export const SearchContainer = _ref => {
  let {
    history,
    isMobile,
    className,
    selectedTab = TABS[0].index,
    inputProps
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isFocused, setFocus] = useState(false);
  const [recentAssets, setRecentAssetSuggestions] = useState(getRecentAssets());

  _extends(inputProps, INPUT_ID_PROPS);

  function addRecentAssetSuggestions(slug) {
    setRecentAssetSuggestions(addRecentAssets(slug));
  }

  function removeRecentAssetSuggestion(slug) {
    setRecentAssetSuggestions(removeRecentAssets(slug));
  }

  function clearRecents() {
    setRecentAssetSuggestions(clearRecentAssets());
  }

  function onFocus() {
    if (isMobile) return;
    setFocus(true);
  }

  function onBlur() {
    if (isMobile) return;
    setFocus(false);
  }

  useEffect(() => {
    const input = document.querySelector('#' + INPUT_ID);
    if (!input) return;

    function onKeyPress(e) {
      const {
        code,
        target
      } = e;

      if (code === 'Slash' && !EDITABLE_TAGS.has(target.tagName)) {
        e.preventDefault();
        input.focus();
      }
    }

    window.addEventListener('keypress', onKeyPress);
    return () => window.removeEventListener('keypress', onKeyPress);
  }, []);
  return selectedTab === TABS[0].index ? /*#__PURE__*/React.createElement(SearchProjects, _extends({}, props, {
    onFocus: onFocus,
    onBlur: onBlur,
    inputProps: inputProps,
    className: cx(styles.wrapper, className, isFocused && styles.focused),
    iconPosition: "left",
    onSuggestionSelect: ({
      category,
      item
    }) => {
      if (category === ASSETS || category === RECENT_ASSETS) {
        const {
          slug = item
        } = item;
        addRecentAssetSuggestions(slug);

        if (isMobile) {
          history.push(`/projects/${slug}`);
        } else {
          history.push(`/charts?slug=${slug}`);
        }
      } else if (category === TRENDING_WORDS) {
        history.push(`/labs/trends/explore/${item}`);
      }
    },
    emptySuggestions: isMobile || recentAssets.length === 0 ? undefined : [{
      id: RECENT_ASSETS,
      title: /*#__PURE__*/React.createElement("div", {
        className: styles.recents
      }, "Recently searched", /*#__PURE__*/React.createElement(Icon, {
        type: "history-clear",
        className: styles.clear,
        onClick: clearRecents
      })),
      items: recentAssets,
      classes: styles,
      suggestionContent: suggestion => /*#__PURE__*/React.createElement(Recent, {
        text: suggestion,
        onRemove: e => {
          e.stopPropagation();
          removeRecentAssetSuggestion(suggestion);
        }
      })
    }]
  })) : /*#__PURE__*/React.createElement(TrendsSearchForm, _extends({}, props, inputProps, {
    classes: {
      wrapper: className,
      input: styles.search
    }
  }));
};
SearchContainer.defaultProps = {
  inputProps: INPUT_ID_PROPS
};
export default withRouter(SearchContainer);