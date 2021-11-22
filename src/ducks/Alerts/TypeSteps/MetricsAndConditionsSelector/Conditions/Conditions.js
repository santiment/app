import React, { useEffect } from "react";
import cx from "classnames";

import MetricOptionsRenderer from "./MetricOprionsRenderer/MetricOptionsRenderer";
import LastPrice from "./LastPrice/LastPrice";
import ConditionSelect from "./ConditionSelect/ConditionSelect";
import TimeWindow from "./TimeWindow/TimeWindow";

import AbsoluteThreshold from "./blocks/AbsoluteThreshold/AbsoluteThreshold";
import AbsoluteBorders from "./blocks/AbsoluteBorders/AbsoluteBorders";
import PercentThresholdByBorders from "./blocks/PercentThresholdByBorders/PercentThresholdByBorders";

import {
  getNewDescription,
  getNewTitle,
  isPriceMetric,
  mapTargetObject,
  targetMapper,
  titleMetricValuesHeader
} from "../../../../Signals/utils/utils";
import { isDailyMetric } from "../../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/metrics";

import styles from "./Conditions.module.scss";

function getLastWord(words) {
  const wordsArr = words.split(" ");
  return wordsArr[wordsArr.length - 1];
}

const Conditions = ({
  values: {
    type,
    metric,
    absoluteBorderRight = 0,
    absoluteBorderLeft = 0,
    target,
    absoluteThreshold,
    percentThreshold,
    threshold,
    percentThresholdLeft,
    percentThresholdRight,
    timeWindow,
    timeWindowUnit,
    subtitle
  },
  values,
  blocks = [],
  showTypes,
  metaFormSettings,
  typeSelectors,
  handleFormValueChange
}) => {
  const { key } = metric;
  const isPrice = isPriceMetric(metric);

  const mappedTargets = mapTargetObject(target, targetMapper);
  const slugName = !Array.isArray(mappedTargets) ? mappedTargets : undefined;

  const isTimeWindow = blocks.includes("timeWindow") && !isDailyMetric(key);

  const defaultType = metaFormSettings.type;

  const handleTitlesChange = (fieldName, value) => {
    const subtitle = titleMetricValuesHeader(
      !!values.type.dependencies,
      {
        ...values,
        [fieldName]: value
      },
      `of ${values.target.map(item => item.name).join(", ")}`
    );
    handleFormValueChange({
      field: "title",
      value: getNewTitle({ ...values, [fieldName]: value })
    });
    handleFormValueChange({
      field: "description",
      value: getNewDescription({ ...values, [fieldName]: value })
    });
    handleFormValueChange({
      field: "subtitle",
      value: subtitle
        ? {
            first: subtitle.titleLabel && getLastWord(subtitle.titleLabel),
            last: subtitle.titleDescription
          }
        : {}
    });
  };

  useEffect(() => {
    handleTitlesChange();
  }, []);

  const handleFieldChange = fieldName => value => {
    handleFormValueChange({
      field: fieldName,
      value
    });
    handleTitlesChange(fieldName, value);
  };

  return (
    <div className={styles.wrapper}>
      {showTypes && (
        <>
          <div className={styles.row}>
            <div className={styles.metricSelector}>
              <div className={cx(styles.conditionInfo, styles.fieldDescr)}>
                <div>{subtitle.first}</div>
                <div>{subtitle.last}</div>
              </div>
              <ConditionSelect
                isClearable={false}
                isSearchable
                disabled={defaultType.isDisabled}
                defaultValue={defaultType.value}
                placeholder="Choose a type"
                options={typeSelectors}
                optionRenderer={MetricOptionsRenderer}
                isOptionDisabled={option => !option.value}
                value={type}
                handleFormValueChange={handleFieldChange("type")}
              />
            </div>
            {type && blocks.includes("absoluteThreshold") && (
              <div>
                <div className={styles.fieldDescr}>
                  {isPrice && <LastPrice slugTitle={slugName} />}
                </div>
                <AbsoluteThreshold
                  type="number"
                  placeholder="Absolute value"
                  prefix={isPrice ? "$" : ""}
                  value={absoluteThreshold}
                  handleFormValueChange={handleFieldChange("absoluteThreshold")}
                />
              </div>
            )}
            {type && blocks.includes("absoluteBorders") && (
              <AbsoluteBorders
                isPriceMetric={isPrice}
                absoluteBorderRight={absoluteBorderRight}
                absoluteBorderLeft={absoluteBorderLeft}
                slugName={slugName}
                handleFormValueChange={handleFieldChange}
              />
            )}

            {type && blocks.includes("percentThreshold") && (
              <div>
                <div className={styles.fieldDescr}>
                  {isPrice && <LastPrice slugTitle={slugName} />}
                </div>
                <AbsoluteThreshold
                  type="number"
                  placeholder="Percentage amount"
                  prefix="%"
                  value={percentThreshold}
                  handleFormValueChange={handleFieldChange("percentThreshold")}
                />
              </div>
            )}

            {type &&
              blocks.includes("percentThresholdLeft") &&
              blocks.includes("percentThresholdRight") && (
                <PercentThresholdByBorders
                  isPriceMetric={isPrice}
                  percentThresholdLeft={percentThresholdLeft}
                  percentThresholdRight={percentThresholdRight}
                  slugName={slugName}
                  handleFormValueChange={handleFieldChange}
                />
              )}

            {type && blocks.includes("threshold") && (
              <div>
                <div className={styles.fieldDescr}>
                  {isPrice && <LastPrice slugTitle={slugName} />}
                </div>
                <AbsoluteThreshold
                  type="number"
                  step={0.001}
                  placeholder="Threshold"
                  value={threshold}
                  handleFormValueChange={handleFieldChange("threshold")}
                />
              </div>
            )}
          </div>
        </>
      )}

      {isTimeWindow && type && (
        <TimeWindow
          timeWindow={timeWindow}
          timeWindowUnit={timeWindowUnit}
          handleFormValueChange={handleFieldChange}
        />
      )}
    </div>
  );
};

export default Conditions;
