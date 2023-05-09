function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect, useMemo } from 'react';
import Panel from '@santiment-network/ui/Panel';
import Message from '@santiment-network/ui/Message';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import { InputWithIcon as Input } from '@santiment-network/ui/Input';
import { useMessage, useStateMetadata } from './hooks';
import Item from './Item';
import ResetButton from './ResetButton';
import { useFeaturedWatchlists, useUserProjectWatchlists } from '../../../gql/lists/hooks';
import { makeHumanReadableState, ALL_ASSETS_TEXT, MAX_VISIBLE_SYMBOLS } from './utils';
import { ALL_PROJECTS_WATCHLIST_SLUG } from '../../../utils';
import styles from './index.module.css';

const EntryPoint = ({
  baseProjects = [],
  setBaseProjects,
  isViewMode
}) => {
  const [state, setState] = useState(baseProjects.length > 0 ? baseProjects : ALL_ASSETS_TEXT);
  const [categories] = useFeaturedWatchlists();
  const [watchlists] = useUserProjectWatchlists();
  const {
    idNameMap,
    setIdNameMap
  } = useStateMetadata(state);
  const {
    message,
    updateMessage
  } = useMessage(state);
  useEffect(() => {
    if (Array.isArray(state) && state.length === 0) {
      setState(ALL_ASSETS_TEXT);
    } else {
      updateMessage(state);

      if (state === ALL_ASSETS_TEXT && baseProjects.length !== 0) {
        setBaseProjects([]);
      }

      if (state !== ALL_ASSETS_TEXT && JSON.stringify(state) !== JSON.stringify(baseProjects)) {
        setBaseProjects(state);
      }
    }
  }, [state]);
  const filteredCategories = useMemo(() => categories.filter(({
    id,
    slug
  }) => {
    const isInState = Array.isArray(state) && state.some(item => item.watchlistId === +id);
    return slug !== ALL_PROJECTS_WATCHLIST_SLUG && !isInState;
  }), [state, categories]);
  const filteredWatchlists = useMemo(() => watchlists.filter(({
    id
  }) => {
    const isInState = Array.isArray(state) && state.some(item => item.watchlistId === +id);
    return !isInState;
  }), [state, watchlists]);
  const [inputState, shortInputState] = useMemo(() => {
    const text = makeHumanReadableState(state, idNameMap);
    return [text, text.length > MAX_VISIBLE_SYMBOLS ? text.slice(0, MAX_VISIBLE_SYMBOLS) + '...' : text];
  }, [state, idNameMap]);

  function addItemInState(item) {
    setState(state === ALL_ASSETS_TEXT ? [item] : [...state, item]);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.overview
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.title
  }, "Entry point: "), /*#__PURE__*/React.createElement("span", {
    className: styles.explanation
  }, inputState), !isViewMode && state !== ALL_ASSETS_TEXT && /*#__PURE__*/React.createElement(ResetButton, {
    onClick: () => setState(ALL_ASSETS_TEXT)
  })), !isViewMode && /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "data-isactive",
    position: "bottom",
    align: "start",
    className: styles.dropdown,
    trigger: /*#__PURE__*/React.createElement(Input, {
      readOnly: true,
      className: styles.trigger__btn,
      iconClassName: styles.trigger__arrow,
      icon: "arrow-down",
      iconPosition: "right",
      value: shortInputState
    })
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, state !== ALL_ASSETS_TEXT && /*#__PURE__*/React.createElement("div", {
    className: styles.selected
  }, state.map(item => {
    const name = idNameMap[item['watchlistId']] || item['watchlistId'] || item;
    return /*#__PURE__*/React.createElement(Item, {
      key: name,
      onClick: () => setState(state.filter(currItem => currItem !== item)),
      isActive: true,
      name: name
    });
  })), message && /*#__PURE__*/React.createElement(Message, {
    variant: "warn",
    icon: "info-round",
    fill: false,
    className: styles.message
  }, message), filteredCategories.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "Explore watchlists"), filteredCategories.map(({
    name,
    id,
    slug
  }) => /*#__PURE__*/React.createElement(Item, {
    key: id,
    onClick: () => {
      setIdNameMap(_objectSpread(_objectSpread({}, idNameMap), {}, {
        [+id]: name
      }));
      addItemInState({
        watchlistId: +id
      });
    },
    name: name,
    isDisabled: message,
    id: id,
    slug: slug
  }))), filteredWatchlists.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "My watchlists"), filteredWatchlists.map(({
    name,
    id,
    slug
  }) => /*#__PURE__*/React.createElement(Item, {
    key: id,
    onClick: () => {
      setIdNameMap(_objectSpread(_objectSpread({}, idNameMap), {}, {
        [+id]: name
      }));
      addItemInState({
        watchlistId: +id
      });
    },
    name: name,
    isDisabled: message,
    id: id,
    slug: slug
  }))))))));
};

export default EntryPoint;