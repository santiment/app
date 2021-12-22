import React from "react";
import cx from "classnames";
import { useFormikContext } from "formik";
import SignalPreview from "../../../../../../../Signals/chart/preview/SignalPreview";
import { useLastPrice } from "../../../../../../hooks/useLastPrice";
import { useProject } from "../../../../../../../../hooks/project";
import {
  getConditionsStr,
  parseOperation,
  splitStr
} from "../../../../../../utils";
import { formatNumber } from "../../../../../../../../utils/formatting";
import styles from "./ChartPreview.module.scss";

const ChartPreview = () => {
  const {
    values,
    values: {
      settings: {
        target: { slug },
        time_window,
        operation
      }
    }
  } = useFormikContext();
  const { data, loading } = useLastPrice(slug);
  const [project] = useProject(slug);

  const shouldRenderChart = slug && typeof slug === "string";
  const shouldRenderPrice = slug && !Array.isArray(slug) && data;
  const { selectedCount, selectedOperation } = parseOperation(operation);
  const conditionsStr = getConditionsStr({
    operation: selectedOperation,
    count: selectedCount,
    timeWindow: time_window
  });
  const { firstWord, rest } = splitStr(conditionsStr);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.condition}>
          <span className={styles.conditionType}>{firstWord}</span>
          {rest}
        </div>
        <div className={styles.price}>
          {!loading &&
            shouldRenderPrice &&
            `1 ${project.ticker} = ${formatNumber(data, { currency: "USD" })}`}
        </div>
      </div>

      <div
        className={cx(
          styles.chartWrapper,
          !shouldRenderChart && styles.noChart
        )}
      >
        {shouldRenderChart ? (
          <SignalPreview type={values.type} trigger={values} />
        ) : (
          "No data"
        )}
      </div>
    </div>
  );
};

export default ChartPreview;
