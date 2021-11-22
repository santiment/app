import React, { useState } from "react";
import cx from "classnames";
import Icon from "@santiment-network/ui/Icon";
import Button from "@santiment-network/ui/Button";

import Steps from "../../../../components/Steps/Steps";
import ProjectIcon from "../../../../components/ProjectIcon/ProjectIcon";

import { ALERT_TYPES } from "../../constants";

import styles from "./AlertModalSidebar.module.scss";

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

  const handleStepClick = step => () => {
    setSelectedStep(step);
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
          {currentAlertType.subSteps.map((item, index) => {
            let description;

            switch (index) {
              case 0:
                const shouldRenderTicker = formValues.target.length > 1;
                description = formValues.target.length > 0 && (
                  <div className={styles.assetsWrapper}>
                    {formValues.target.slice(0, 3).map(asset => (
                      <div key={asset.id} className={styles.projectWrapper}>
                        <ProjectIcon
                          size={16}
                          slug={asset.slug}
                          logoUrl={asset.logoUrl}
                        />
                        <div className={styles.projectTitle}>
                          {shouldRenderTicker ? asset.ticker : asset.name}
                        </div>
                      </div>
                    ))}
                    {formValues.target.length > 3 && (
                      <div className={styles.projectWrapper}>
                        <div className={styles.projectLengthTitle}>
                          + {formValues.target.length - 3}
                        </div>
                      </div>
                    )}
                  </div>
                );
                break;
              case 1:
                description = formValues.metric.label && (
                  <div className={styles.metricsWrapper}>
                    <div className={styles.metricWrapper}>
                      <div className={styles.metricTitle}>
                        {formValues.metric.label}
                      </div>
                    </div>
                    {formValues.subtitle.first && (
                      <div className={styles.metricSubtitle}>
                        <span>{formValues.subtitle.first} </span>
                        {formValues.subtitle.last}
                      </div>
                    )}
                  </div>
                );
                break;
              default:
                description = "";
            }

            const isDisabled = formValues.target.length === 0 && index !== 0;

            return (
              <Steps.Step
                disabled={isDisabled}
                key={item.label}
                title={item.label}
                description={description}
                onClick={handleStepClick(index)}
              />
            );
          })}
        </Steps>
      </div>
    </div>
  );
};

export default AlertModalSidebar;
