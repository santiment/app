const _excluded = ["isActive", "activeSub", "setActive", "scrollToSubItem"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Svg from 'san-webkit/lib/ui/Svg/react';
import styles from './NavItem.module.css';

const SubItem = ({
  subItem,
  activeSub,
  scrollToSubItem
}) => {
  const {
    key,
    title
  } = subItem;
  const isActiveSub = key === activeSub.key;

  function handleSubItemClick() {
    scrollToSubItem(subItem);
  }

  return /*#__PURE__*/React.createElement("li", {
    className: cx(styles.subItemWrapper, isActiveSub && styles.activeSub, 'mrg-xs mrg--b')
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.subItem, 'btn'),
    onClick: handleSubItemClick
  }, title));
};

const NavItem = _ref => {
  let {
    isActive,
    activeSub,
    setActive,
    scrollToSubItem
  } = _ref,
      item = _objectWithoutProperties(_ref, _excluded);

  const {
    title,
    subItems
  } = item;
  return /*#__PURE__*/React.createElement("li", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: cx(styles.item, isActive && styles.active, 'btn row v-center justify'),
    onClick: () => {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'auto'
      });
      setActive(item);
    }
  }, /*#__PURE__*/React.createElement("span", null, title), subItems && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.arrowIcon, 'row hv-center')
  }, /*#__PURE__*/React.createElement(Svg, {
    id: "arrow-right",
    h: 8,
    w: 5
  }))), activeSub && /*#__PURE__*/React.createElement("ul", {
    className: cx(styles.subWrapper)
  }, subItems.map(subItem => /*#__PURE__*/React.createElement(SubItem, {
    key: subItem.key,
    activeSub: activeSub,
    subItem: subItem,
    scrollToSubItem: scrollToSubItem
  }))));
};

export default NavItem;