import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { calculateExitTime, calculateTime, MAX_TIME } from './utils';
import styles from './index.module.css';
const transitionStyles = {
  enter: styles.contentEnter,
  enterActive: styles.contentEnterActive,
  exit: styles.contentExit,
  exitActive: styles.contentExitActive
};

const AccordionContent = ({
  children,
  show,
  animateOnMount = false
}) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(null);

  function clearMaxHeight() {
    if (containerRef && containerRef.current) {
      containerRef.current.style.maxHeight = '';
    }
  }

  useEffect(() => {
    const elem = containerRef.current;

    if (show && height === null) {
      if (animateOnMount) {
        elem.style.maxHeight = 0;
        const elemHeight = elem.scrollHeight;
        setHeight(elemHeight);
        setTimeout(() => clearMaxHeight(), MAX_TIME + 200);
      }
    }

    if (show && height === 0) {
      elem.style.maxHeight = 0;
      const elemHeight = elem.scrollHeight;
      setHeight(elemHeight);
    }

    if (!show && height !== 0) {
      elem.style.maxHeight = elem.scrollHeight + 'px';
      setHeight(0);
    }

    return () => clearMaxHeight();
  }, [show]);
  useEffect(() => {
    if (height === null) {
      return;
    }

    const elem = containerRef.current;

    if (height > 0) {
      elem.style.transition = `max-height ${calculateTime(height)}ms ease-in-out`;
      elem.style.maxHeight = height + 'px';
    }

    if (height === 0) {
      elem.style.transition = `max-height ${calculateExitTime(elem.scrollHeight)}ms ease`;
      elem.style.maxHeight = 0;
    }
  }, [height]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.roll, show && styles.rollOut),
    ref: containerRef
  }, /*#__PURE__*/React.createElement(CSSTransition, {
    unmountOnExit: true,
    in: show,
    timeout: MAX_TIME,
    classNames: transitionStyles,
    onEntered: clearMaxHeight,
    onExited: clearMaxHeight
  }, children));
};

export default AccordionContent;