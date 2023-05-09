import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { Row } from '../Section/index';
import AccordionContent from '../../../components/AccordionContent';
import styles from './index.module.css';
const OBJ = {};

const Accordion = ({
  title,
  children,
  isOpenedDefault = false,
  classes = OBJ,
  animateOnMount,
  showArrow = true
}) => {
  const [isOpened, setIsOpened] = useState(isOpenedDefault);

  function toggleOpen() {
    setIsOpened(!isOpened);
  }

  return /*#__PURE__*/React.createElement(Row, {
    className: cx(styles.wrapper, isOpened && styles.wrapper_opened)
  }, /*#__PURE__*/React.createElement(Row, {
    className: cx(styles.header, classes.accordionTitle),
    onClick: toggleOpen
  }, title, showArrow && /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-down-big",
    className: styles.toggle
  })), /*#__PURE__*/React.createElement(AccordionContent, {
    show: isOpened,
    animateOnMount: animateOnMount
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content, classes.accordionContent)
  }, children)));
};

export default Accordion;