import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import SignalPreview from '../../../../../../../Signals/chart/preview/SignalPreview'
import { useLastPrice } from '../../../../../../hooks/useLastPrice'
import { useProject } from '../../../../../../../../hooks/project'
import { getConditionsStr, parseOperation, splitStr } from '../../../../../../utils'
import { formatNumber } from '../../../../../../../../utils/formatting'
import { PERCENT_METRICS, USD_METRICS } from '../../constants'
import styles from './ChartPreview.module.scss'

const ChartPreview = ({ isWallet, metric }) => {
  const {
    values,
    values: {
      settings: {
        target: { slug },
        time_window,
        operation,
        selector,
      },
    },
  } = useFormikContext()
  const currentSlug = isWallet ? selector.slug : slug
  const { data, loading } = useLastPrice(currentSlug)
  const [project] = useProject(currentSlug)

  const shouldRenderChart = currentSlug && typeof currentSlug === 'string'
  const shouldRenderPrice = currentSlug && !Array.isArray(currentSlug) && data
  const { selectedCount, selectedOperation } = parseOperation(operation)
  const hasPriceIcon = USD_METRICS.has(metric.key)
  const isPercentIcon = PERCENT_METRICS.has(metric.key)
  const conditionsStr = getConditionsStr({
    operation: selectedOperation,
    count: selectedCount,
    timeWindow: time_window,
    hasPriceIcon,
    isPercentIcon,
  })

  const { firstWord, rest } = splitStr(conditionsStr)

  return (
    <div className={styles.wrapper}>
      {!isWallet && (
        <div className={styles.info}>
          <div className={styles.condition}>
            <span className={styles.conditionType}>{firstWord}</span>
            {rest}
          </div>
          <div className={styles.price}>
            {!loading &&
              shouldRenderPrice &&
              `1 ${project && project.ticker} = ${formatNumber(data, {
                currency: 'USD',
              })}`}
          </div>
        </div>
      )}

      <div className={cx(styles.chartWrapper, !shouldRenderChart && styles.noChart)}>
        {shouldRenderChart && <SignalPreview type={values.type} trigger={values} />}
      </div>
    </div>
  )
}

export default ChartPreview
