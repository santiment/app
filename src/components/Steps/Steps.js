import React, { cloneElement } from "react";
import cx from "classnames";
import Step from "./Step/Step";
import styles from "./Steps.module.scss";

const Steps = ({
  className,
  children,
  size,
  current,
  initial,
  icons,
  onChange,
  selected,
  ...restProps
}) => {
  function onStepClick(next) {
    if (onChange && current !== next) {
      onChange(next);
    }
  }

  return (
    <div className={cx(styles.steps, className)} {...restProps}>
      {React.Children.map(children, (child, index) => {
        const stepNumber = initial + index;
        const childProps = {
          stepNumber: `${stepNumber + 1}`,
          stepIndex: stepNumber,
          key: stepNumber,
          icons,
          onStepClick: onChange && onStepClick,
          size,
          selected,
          ...child.props
        };

        if (!child.props.status) {
          if (stepNumber === current) {
            childProps.status = "selected";
          } else if (stepNumber < current) {
            childProps.status = "visited";
          } else {
            childProps.status = "wait";
          }
        }
        childProps.active = stepNumber === current;

        return cloneElement(child, childProps);
      })}
    </div>
  );
};

Steps.Step = Step;

Steps.defaultProps = {
  initial: 0,
  current: 0,
  size: ""
};

export default Steps;
