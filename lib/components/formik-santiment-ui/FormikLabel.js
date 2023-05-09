import React from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import styles from './FormikLabel.module.css';

const FormikLabel = ({
  text = '\u00A0',
  inner,
  className,
  onClick
}) => {
  return /*#__PURE__*/React.createElement(Label, {
    accent: "waterloo",
    onClick: onClick,
    className: cx(styles.label, inner && styles.inner, className)
  }, text);
};

export default FormikLabel;