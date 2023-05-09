function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState, useRef } from 'react';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import styles from './index.module.css';
export const useDropdown = () => {
  const activeRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const stateRef = useRef(isOpened);
  stateRef.current = isOpened;
  const Dropdown = useRef(props => /*#__PURE__*/React.createElement(ContextMenu, _extends({}, props, {
    open: stateRef.current,
    className: styles.tooltip,
    position: "bottom",
    on: "click",
    onOpen: open,
    onClose: close
  }))).current;
  useEffect(() => {
    const btn = activeRef.current;

    if (isOpened && btn) {
      const {
        parentNode
      } = btn; // NOTE: .scrollIntoView also scrolls the window viewport [@vanguard | Aug 12, 2020]

      parentNode.scrollTop = btn.offsetTop - parentNode.clientHeight / 2;
    }
  }, [isOpened]);

  function open() {
    setIsOpened(true);
  }

  function close() {
    setIsOpened(false);
  }

  return {
    activeRef,
    close,
    Dropdown
  };
};