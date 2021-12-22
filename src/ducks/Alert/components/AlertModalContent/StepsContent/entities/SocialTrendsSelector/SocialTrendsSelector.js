import React from "react";
import { useField, useFormikContext } from "formik";
import Selector from "@santiment-network/ui/Selector/Selector";
import StepTitle from "../../StepTitle/StepTitle";
import NextStep from "../../NextStep/NextStep";
import styles from "./SocialTrendsSelector.module.scss";
import { SOCIAL_TRENDS_OPTIONS } from "./constants";
import AssetSelector from "../AssetSelector/AssetSelector";

const SocialTrendsSelector = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  },
  selectorSettings
}) => {
  const [, { value: target }, { setValue: setTarget }] = useField(
    "settings.target"
  );
  const {
    values: {
      settings: {
        target: { slug, watchlist_id, word }
      }
    }
  } = useFormikContext();

  function handleNextClick() {
    setSelectedStep(selectedStep + 1);

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1]);
    }
  }

  function handleSelectTarget(target) {
    if (target === "slug") {
      setTarget({ slug: "" });
    }
    if (target === "word") {
      setTarget({ word: "" });
    }
    if (target === "watchlist_id") {
      setTarget({ watchlist_id: "" });
    }
  }

  const noSlug = typeof slug === "string" ? !slug : slug && slug.length === 0;
  const noWord = typeof word === "string" ? !word : word && word.length === 0;
  const defaultSelector = target && Object.keys(target)[0];

  let children = <></>;

  if (defaultSelector === "slug") {
    children = <AssetSelector isSocial selectorSettings={selectorSettings} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <StepTitle
          iconType="social"
          title="Choose Social trend"
          className={styles.title}
        />
        {(!noSlug || watchlist_id || !noWord) && (
          <NextStep label="Notification settings" onClick={handleNextClick} />
        )}
      </div>
      <Selector
        className={styles.selector}
        options={SOCIAL_TRENDS_OPTIONS.map(({ type }) => type)}
        nameOptions={SOCIAL_TRENDS_OPTIONS.map(({ label }) => label)}
        defaultSelected={defaultSelector || "slug"}
        onSelectOption={handleSelectTarget}
        variant="border"
      />
      {children}
    </div>
  );
};

export default SocialTrendsSelector;
