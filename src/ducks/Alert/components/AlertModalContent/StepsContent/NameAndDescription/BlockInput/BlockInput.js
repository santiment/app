import React from "react";
import styles from "./BlockInput.module.scss";
import cx from "classnames";

const BlockInput = ({ label, value, onChange, blockClassname, ...rest }) => (
  <div className={cx(styles.wrapper, blockClassname)}>
    <div className={styles.label}>{label}</div>
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textarea}
      {...rest}
    />
  </div>
);

export default BlockInput;
