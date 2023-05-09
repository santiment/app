const _excluded = ["index", "left", "top", "user", "isOpened", "isAnon", "setOpenedIndex"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Insight from './Insight';
import Avatar from './Avatar';
import styles from './Point.module.css';
import insightStyles from './Insight.module.css';

const Point = _ref => {
  let {
    index,
    left,
    top,
    user,
    isOpened,
    isAnon,
    setOpenedIndex
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  function openInsight() {
    setOpenedIndex(index);
  }

  function closeInsight() {
    setOpenedIndex();
  }

  return /*#__PURE__*/React.createElement(ContextMenu, {
    open: isOpened,
    position: "top",
    on: "click",
    offsetY: 16,
    onOpen: openInsight,
    onClose: closeInsight,
    trigger: /*#__PURE__*/React.createElement(Avatar, {
      className: cx(styles.avatar, isOpened && styles.avatar_active),
      src: user.avatarUrl,
      left: left,
      top: top
    }),
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(insightStyles.wrapper, isAnon && insightStyles.wrapper_anon)
  }, isOpened && /*#__PURE__*/React.createElement(Insight, _extends({}, props, {
    user: user
  }))));
};

export default Point;