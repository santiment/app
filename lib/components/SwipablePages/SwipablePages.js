import React, { useState } from 'react';
import cx from 'classnames';
import ReactSwipe from 'react-swipe';
import styles from './SwipablePages.module.css';
export const useSwipeState = () => {
  const [active, setActive] = useState(0);

  function onChange(value) {
    setActive(value);
  }

  return {
    onChange,
    active
  };
};

const SwipablePages = ({
  pages
}) => {
  const {
    active,
    onChange
  } = useSwipeState();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReactSwipe, {
    className: styles.swipeContainer,
    swipeOptions: {
      callback: onChange,
      continuous: false,
      startSlide: active
    }
  }, pages.map((ElWrapper, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, ElWrapper);
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.dots
  }, pages.map((item, index) => {
    return /*#__PURE__*/React.createElement("svg", {
      className: cx(styles.dot, index === active && styles.active),
      key: index,
      width: "6",
      height: "6",
      viewBox: "0 0 6 6",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "3",
      cy: "3",
      r: "3",
      fill: "inherit"
    }));
  })));
};

export default SwipablePages;