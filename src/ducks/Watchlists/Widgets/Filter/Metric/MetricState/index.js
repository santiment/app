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
  const {
    key,
    descriptionKey,
    label,
    isOnlyPercentFilters,
    isDeprecated
  } = metric
  const metricForDescription = Metric[descriptionKey || key] || EMPTY_OBJ
  const isPaywalled = isOnlyPercentFilters && !isPro
  const isDisabled = isViewMode && !isActive

  const onClick = () =>
    !isViewMode && !isPaywalled ? onCheckboxClicked() : null

  return (
    <div className={styles.wrapper}>
      <div
        onClick={onClick}
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
          <span>{label}</span>
          {isDeprecated && <DeprecatedLabel isAuthor={!isViewMode} />}
          {isOnlyPercentFilters && !isPro && !isDeprecated && !isViewMode && (
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
