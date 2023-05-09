function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import NavItem from './NavItem/NavItem';
import { DASHBOARDS } from '../constants';
import styles from './Nav.module.css';

const Nav = ({
  navSettings
}) => {
  const {
    activeItem,
    activeSubItem,
    setActiveItem,
    scrollToSubItem
  } = navSettings;
  if (!activeItem) return null;
  return /*#__PURE__*/React.createElement("nav", {
    className: cx(styles.wrapper, 'relative column')
  }, /*#__PURE__*/React.createElement("ul", {
    className: styles.nav
  }, DASHBOARDS.map(dashboard => {
    const isActive = dashboard.title === activeItem.title;
    const hasSub = dashboard.subItems && activeSubItem;
    const activeSub = hasSub && dashboard.subItems.find(({
      key
    }) => activeSubItem.key === key);
    return /*#__PURE__*/React.createElement(NavItem, _extends({
      key: dashboard.title,
      isActive: isActive,
      activeSub: activeSub,
      setActive: setActiveItem,
      scrollToSubItem: scrollToSubItem
    }, dashboard));
  })));
};

export default Nav;