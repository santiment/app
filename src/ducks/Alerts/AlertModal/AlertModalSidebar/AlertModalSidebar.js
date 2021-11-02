import React, { useState } from "react";
import cx from "classnames";
import Icon from "@santiment-network/ui/Icon";
import Button from "@santiment-network/ui/Button";

import Steps from "../../../../components/Steps/Steps";

import { ALERT_TYPES } from "../../constants";

import styles from "./styles.module.scss";
import ProjectIcon from "../../../../components/ProjectIcon/ProjectIcon";

const AlertModalSidebar = ({
  currentAlertType,
  selectedStep,
  setSelectedStep,
  onChange,
  formValues
}) => {
  const [selectedType, setSelectedType] = useState(currentAlertType);

  const handleSelectType = type => () => {
    setSelectedType(type);
    onChange(type);
  };

  const handleClickBack = () => {
    setSelectedStep(undefined);
  };

  if (selectedStep === undefined) {
    return (
      <div className={styles.sidebar}>
        {ALERT_TYPES.map(type => (
          <div
            key={type.title}
            onClick={handleSelectType(type)}
            className={cx(
              styles.type,
              selectedType.title === type.title && styles.activeType
            )}
          >
            {type.title}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <Button onClick={handleClickBack} className={styles.backButton}>
        <Icon type="pointer-right" /> Type of alert
      </Button>
      <div className={styles.smallStepSelector}>
        <Steps size="small" initial={0} current={selectedStep}>
          {currentAlertType.subSteps.map((item, index) => (
            <Steps.Step
              key={item.label}
              title={item.label}
              description={
                index === 0 && formValues.asset.slug ? (
                  <div
                    style={{
                      border: "1px solid #E7EAF3",
                      display: "flex",
                      alignItems: "center",
                      height: 24,
                      padding: "4px 8px",
                      borderRadius: 4
                    }}
                  >
                    <ProjectIcon
                      className={styles.icon}
                      size={16}
                      slug={formValues.asset.slug}
                      logoUrl={formValues.asset.logoUrl}
                    />
                    <div style={{
                      fontSize: 12,
                      color: '#2F354D',
                      marginLeft: 6,
                      lineHeight: '16px'
                    }}>
                      {formValues.asset.name}
                    </div>
                  </div>
                ) : (
                  ""
                )
              }
            />
          ))}
        </Steps>
      </div>
    </div>
  );
};

export default AlertModalSidebar;
