import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import cx from "classnames";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";

import { GroupNodes } from "../../../../Studio/Sidebar/Group";
import MetricButton from "../../../../Studio/Sidebar/Button";
import ExpansionItem from "../../../../../components/ExpansionItem/ExpansionItem";

import { getAssetNewMetrics } from "../../../../dataHub/metrics/news";
import { useProject } from "../../../../../hooks/project";
import { METRICS_OPTIONS } from "../../../../Signals/utils/constants";

import styles from "./MetricsList.module.scss";

const getSelectedCount = groupItems => {
  const keys = Object.keys(groupItems);

  return keys.reduce(
    (acc, curr) => {
      const metricsArr = groupItems[curr];

      const metricsLength = metricsArr.reduce((metricsAcc, metricsCurr) => {
        const metricLength = metricsCurr.item.label.length > 50 ? 1.45 : 1;
        if (metricsCurr.subitems.length > 0) {
          return metricsAcc + metricLength + metricsCurr.subitems.length;
        }

        return metricsAcc + metricLength;
      }, 0);

      return acc + metricsLength;
    },
    keys.length !== 1 ? keys.length - 1 : 0
  );
};

const getDefaultMetrics = () => {
  let metrics = [];

  METRICS_OPTIONS.filter(metric => metric.label !== "Social Trends").forEach(
    metric => {
      metrics.push({
        item: {
          ...metric
        },
        subitems: []
      });
    }
  );

  return {
    _: metrics
  };
};

export const NO_GROUP = "_";

const ROW_HEIGHT = 40;

const noop = () => {};

function MetricsList({
  list,
  onSelect,
  availableMetrics,
  isBeta,
  slug,
  selected = [],
  hasError,
  hasValue,
  cardHeight
}) {
  const [selectedIndexes, setSelectedIndexes] = useState([0]);
  const listRef = useRef(null);
  const metricKeys = useMemo(() => ["Suggested", ...Object.keys(list)], [list]);

  const [project] = useProject(slug);
  const newMetricsProps = getAssetNewMetrics(availableMetrics, {
    slug: project ? project.slug : undefined,
    isBeta
  });

  const { NewMetricsCategory } = newMetricsProps;

  const defaultMetrics = getDefaultMetrics();

  const getRowHeight = useCallback(
    ({ index }) => {
      return selectedIndexes.includes(index)
        ? getSelectedCount(
            metricKeys[index] === "Suggested"
              ? getDefaultMetrics()
              : list[metricKeys[index]]
          ) *
            32 +
            ROW_HEIGHT +
            8
        : ROW_HEIGHT;
    },
    [selectedIndexes, list]
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.recomputeRowHeights();
    }
  }, [getRowHeight, availableMetrics]);

  const handleExpansionClick = itemIndex => isOpened => {
    isOpened
      ? setSelectedIndexes(prev => prev.filter(idx => idx !== itemIndex))
      : setSelectedIndexes(prev => [...prev, itemIndex]);
  };

  const rowRenderer = useCallback(
    props => {
      const { index, style, key } = props;
      return (
        <ExpansionItem
          key={key}
          isOpen={selectedIndexes.includes(index)}
          title={
            <div
              className={NewMetricsCategory[metricKeys[index]] && styles.news}
            >
              {metricKeys[index]}
            </div>
          }
          style={style}
          onClick={handleExpansionClick(index)}
          classes={{
            expansion: styles.expansionContainer,
            title: styles.expansionTitle,
            opened: styles.expansionOpened,
            arrow: styles.expansionIcon
          }}
          iconType="arrow-down"
        >
          <div className={styles.innerList}>
            {metricKeys[index] === "Suggested"
              ? Object.keys(defaultMetrics).map(key => {
                  const items = defaultMetrics[key];
                  return (
                    <Group
                      key={key}
                      groupLabel={key}
                      group={items}
                      onSelect={onSelect}
                      project={project}
                      selected={selected}
                      setMetricSettingMap={noop}
                      {...newMetricsProps}
                    />
                  );
                })
              : Object.keys(list[metricKeys[index]]).map(key => {
                  const items = list[metricKeys[index]][key];
                  return (
                    <Group
                      key={key}
                      groupLabel={key}
                      group={items}
                      onSelect={onSelect}
                      project={project}
                      selected={selected}
                      setMetricSettingMap={noop}
                      {...newMetricsProps}
                    />
                  );
                })}
          </div>
        </ExpansionItem>
      );
    },
    [selectedIndexes, metricKeys]
  );

  const wrapperStyle = {
    height: hasError ? 282 : hasValue ? 306 - cardHeight : 306
  };

  return (
    <div style={wrapperStyle} className={styles.wrapperList}>
      {metricKeys.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={styles.list}
              width={width}
              height={height}
              rowHeight={getRowHeight}
              rowCount={metricKeys.length}
              overscanRowCount={6}
              rowRenderer={rowRenderer}
              ref={listRef}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
}

const Group = ({ groupLabel, onSelect, group, project, selected, ...rest }) => {
  if (group.length === 0) {
    return null;
  }

  const { NewMetricsGroup } = rest;

  return (
    <>
      {groupLabel !== NO_GROUP && (
        <div
          className={cx(
            styles.group,
            NewMetricsGroup[groupLabel] && styles.news
          )}
        >
          {groupLabel}
        </div>
      )}
      <GroupNodes
        nodes={group}
        activeMetrics={selected}
        toggleMetric={onSelect}
        project={project}
        btnProps={{
          btnClassName: styles.metricBtn,
          infoClassName: styles.info,
          tooltipPosition: "top",
          btnType: "question-round-small"
        }}
        Button={MetricButton}
        {...rest}
      />
    </>
  );
};

export default MetricsList;
