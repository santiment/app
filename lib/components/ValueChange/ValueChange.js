import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import styles from './ValueChange.module.css';
const Change = {
  true: ['lima', 'triangle-up'],
  false: ['persimmon', 'triangle-down']
};
const notChanged = ['texas-rose', 'lock-small'];

const ValueChange = ({
  className,
  suffix,
  change,
  render
}) => {
  const changed = change !== 0;
  const [accent, triangle] = changed ? Change[change > 0] : notChanged;
  return /*#__PURE__*/React.createElement("span", {
    className: cx(styles.wrapper, className),
    style: {
      color: `var(--${accent})`,
      fill: `var(--${accent})`
    }
  }, changed && /*#__PURE__*/React.createElement("div", {
    className: styles.triangle,
    style: {
      background: `var(--${accent}-light)`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    type: triangle
  })), render(Math.abs(change)), suffix);
};

ValueChange.defaultProps = {
  change: 0,
  render: change => change
};
export default ValueChange;