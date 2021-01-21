import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import MetricExplanation from '../../../../../SANCharts/MetricExplanation'
import Explanation from './Explanation'
import DeprecatedLabel from './DeprecatedLabel'
import { Metric } from '../../../../../dataHub/metrics'
import { ProLabel } from '../../../../../../components/ProLabel'
import ProPopupWrapper from '../../../../../../components/ProPopup/Wrapper'
import styles from './index.module.scss'

const EMPTY_OBJ = {}

const FilterMetricState = ({
  isActive,
  isPro,
  onCheckboxClicked,
  isViewMode,
  metric,
  settings,
  customStateText = '',
  isFinishedState
}) => {
  const metricForDescription =
    Metric[metric.descriptionKey || metric.key] || EMPTY_OBJ
  const isPaywalled = metric.isOnlyPercentFilters && !isPro
  const isDisabled = isViewMode && !isActive

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() =>
          !isViewMode && !isPaywalled ? onCheckboxClicked() : null
        }
        className={cx(
          styles.toggle,
          isDisabled && styles.toggle__disabled,
          isPaywalled && !isViewMode && styles.toggle__disabled,
          isViewMode && styles.toggle__notActive
        )}
      >
        <Checkbox
          isActive={isActive}
          disabled={isViewMode || isPaywalled}
          className={styles.checkbox}
        />
        <div className={styles.title}>
          <span>{metric.label}</span>
          {metric.isDeprecated && <DeprecatedLabel isAuthor={!isViewMode} />}
          {metric.isOnlyPercentFilters &&
            !isPro &&
            !metric.isDeprecated &&
            !isViewMode && (
            <ProPopupWrapper type='screener' className={styles.proLabel}>
              <ProLabel as='span' />
            </ProPopupWrapper>
          )}
          {isActive && (
            <Explanation
              {...settings}
              metric={metric}
              customStateText={customStateText}
              isFinishedState={isFinishedState}
              className={styles.explanation}
            />
          )}
        </div>
      </div>
      <MetricExplanation
        on='click'
        metric={metricForDescription}
        position='bottom'
        align='end'
      >
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    </div>
  )
}

export default FilterMetricState
