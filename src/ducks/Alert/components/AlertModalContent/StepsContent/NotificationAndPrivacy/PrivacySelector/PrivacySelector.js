import React from "react";
import Toggle from "@santiment-network/ui/Toggle";
import Icon from "@santiment-network/ui/Icon";
import styles from "./PrivacySelector.module.scss";
import { useField } from "formik";

const IconNotActive = props => <Icon {...props} type="eye-disabled" />;
const IconActive = props => <Icon {...props} type="eye" />;

const PrivacySelector = () => {
  const [, { value }, { setValue }] = useField("isPublic");

  return (
    <div className={styles.wrapper}>
      {value ? "Public" : "Private"}
      <Toggle
        isActive={value}
        IconActive={IconActive}
        IconNotActive={IconNotActive}
        onClick={() => setValue(!value)}
      />
    </div>
  );
};

export default PrivacySelector;
