function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import cx from 'classnames';
import styles from './IndexTab.module.css';

const IndexTab = ({
  tabs,
  initialTab = 0,
  renderTopActions = [],
  bottomActions = []
}) => {
  const [activeTab, setTab] = useState(initialTab);
  const tab = tabs[activeTab];
  const {
    content,
    id
  } = tab;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: cx('row justify mrg--b mrg-xxl', styles.wrapper)
  }, renderTopActions(activeTab), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.tabs, 'row')
  }, tabs.map(item => {
    if (!item) {
      return null;
    }

    const {
      title,
      id
    } = item;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: cx(styles.title, 'btn mrg--l mrg-xxl  h4 txt-m', id === activeTab && styles.active),
      onClick: () => setTab(id)
    }, title);
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.actions, 'row v-center')
  }, bottomActions.filter(({
    showOnTabs,
    hide,
    component
  }) => {
    if (!component) {
      return false;
    }

    if (hide) {
      return false;
    }

    if (showOnTabs) {
      return showOnTabs.includes(id);
    }

    return true;
  }).map(({
    component: Action,
    props,
    id
  }) => /*#__PURE__*/React.createElement(Action, _extends({
    key: id
  }, props))))), content);
};

export default IndexTab;