import React, { useEffect, useMemo, useState } from "react";
import { useField } from "formik";
import MetricsList from "./MetricsList/MetricsList";
import Search from "../../../../../../Studio/Sidebar/Search";
import { SEARCH_PREDICATE_ONLY_METRICS } from "../../../../../../Studio/Compare/Comparable/Metric";
import { useMergedTimeboundSubmetrics } from "../../../../../../dataHub/timebounds";
import { getCategoryGraph } from "../../../../../../Studio/Sidebar/utils";
import { useProject } from "../../../../../../../hooks/project";
import { useIsBetaMode } from "../../../../../../../stores/ui";
import { filterOnlyMetrics, getByAvailable } from "./utils";
import styles from "./MetricSelector.module.scss";

const searchProps = {
  iconPosition: "left",
  inputProps: {
    placeholder: "Search for a metric"
  },
  className: styles.search,
  searchPredicate: SEARCH_PREDICATE_ONLY_METRICS
};

//_: Array(4)
// 0:
// item:
// category: "Financial"
// fill: true
// formatter: ƒ usdFormatter(val)
// key: "volume_usd"
// label: "Volume"
// node: "bar"
// [[Prototype]]: Object
// subitems: []
// [[Prototype]]: Object
// 1: {item: {…}, subitems: Array(0)}
// 2: {item: {…}, subitems: Array(0)}
// 3: {item: {…}, subitems: Array(0)}
// length: 4

const suggestedMetrics = {
  Suggested: {
    _: [
      {
        item: { category: "Suggested", label: "Price", key: "price_usd" },
        subitems: []
      },
      {
        item: {
          category: "Suggested",
          label: "Daily Active Addresses",
          key: "daily_active_addresses"
        },
        subitems: []
      }
    ]
  }
};

const MetricSelector = ({ selectedMetric, metrics, target, onChange }) => {
  const [, , { setValue: setMetric }] = useField("settings.metric");
  const isBeta = useIsBetaMode();
  const [project] = useProject(target.slug);
  const [categories, setCategories] = useState({});

  const allMetrics = useMemo(
    () =>
      getByAvailable(
        metrics.some(m => m.includes("nvt"))
          ? metrics.concat("nvt_5min")
          : metrics,
        target
      ),
    [metrics, target]
  );

  const allSubmetrics = useMergedTimeboundSubmetrics(metrics);

  useEffect(() => {
    const submetrics = filterOnlyMetrics(allSubmetrics);
    const newCategories = getCategoryGraph(allMetrics, [], submetrics, isBeta);
    setCategories({ ...suggestedMetrics, ...newCategories });
  }, [metrics, allMetrics, isBeta]);

  function handleSelectMetric(metric) {
    setMetric(metric.key);
    onChange(metric);
  }

  return (
    <>
      <Search
        {...searchProps}
        categories={categories}
        toggleMetric={handleSelectMetric}
        project={project}
      />
      <MetricsList
        metricsList={categories}
        project={project}
        onSelect={handleSelectMetric}
        selectedMetric={selectedMetric}
      />
    </>
  );
};

export default MetricSelector;
