import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import styles from './TriggerFormBlock.module.css';

const TriggerFormBlock = ({
  children,
  show = true,
  titleLabel = '',
  titleDescription = '',
  enabledHide = true,
  showDescription = true,
  className
}) => {
  const [isShow, setShowing] = useState(show);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.block, className)
  }, titleLabel && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.header, enabledHide && styles.clickable),
    onClick: () => enabledHide && setShowing(!isShow)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.headerContent
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.title
  }, titleLabel), showDescription && /*#__PURE__*/React.createElement("span", {
    className: styles.description
  }, titleDescription || '...')), enabledHide && /*#__PURE__*/React.createElement(Button, {
    type: "button",
    className: styles.action
  }, isShow && /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-up"
  }), !isShow && /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-down"
  }))), isShow && /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, children));
};

export const TriggerFormBlockDivider = ({
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.dividerContainer, className)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.divider
}));
export default TriggerFormBlock;