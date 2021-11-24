import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'

import MetricIcon from '../../../../components/Illustrations/MetricIcon'
import Search from '../../../Studio/Sidebar/Search'
import MetricsList from './MetricsList/MetricsList'
import Steps from '../../../../components/Steps/Steps'
import ConditionsIcon from '../../../../components/Illustrations/ConditionsIcon'
import Conditions from './Conditions/Conditions'
import SignalPreview from '../../../Signals/chart/preview/SignalPreview'

import { SEARCH_PREDICATE_ONLY_METRICS } from '../../../Studio/Compare/Comparable/Metric'
import { useIsBetaMode } from '../../../../stores/ui'
import { useMergedTimeboundSubmetrics } from '../../../dataHub/timebounds'
import { getCategoryGraph } from '../../../Studio/Sidebar/utils'
import { filterOnlyMetrics, getByAvailable, useAvailableMetrics } from './utils'
import {
  COMMON_PROPS_FOR_METRIC,
  METRIC_TO_TYPES,
  METRICS_OPTIONS
} from '../../../Signals/utils/constants'
import { Metric } from '../../../dataHub/metrics'
import { capitalizeStr } from '../../../../utils/utils'
import {
  couldShowChart,
  getNearestTypeByMetric,
  mapFormPropsToTrigger
} from '../../../Signals/utils/utils'

import styles from './MetricsAndConditionsSelector.module.scss'

const MetricsAndConditionsSelector = ({
  handleStepClick,
  slug,
  trigger,
  values,
  handleFormValueChange,
  metaFormSettings,
  handleTitlesChange
}) => {
  const [{ availableMetrics }, loading] = useAvailableMetrics(slug)
  const isBeta = useIsBetaMode()
  const [isEditMetricMode, setIsEditMetricMode] = useState(true)
  const [cardHeight, setCardHeight] = useState(0)

  const cardRef = useCallback(node => {
    if (node !== null) {
      setCardHeight(node.getBoundingClientRect().height + 16)
    }
  }, [])

  const [error, showErrorAlert] = useState('')
  const [categories, setCategories] = useState({})

  useEffect(() => {
    if (values.metric.key) {
      setIsEditMetricMode(false)
    }
  }, [])

  useEffect(() => {
    if (slug && !loading) {
      const checking = trigger.settings.metric

      const notAvailable = availableMetrics.indexOf(checking) === -1
      const notDefined = !METRICS_OPTIONS.some(
        ({ metric }) => metric === checking
      )

      if (notAvailable && notDefined) {
        const nameOfMetric =
          (Metric[checking] && Metric[checking].label) || checking
        showErrorAlert(
          `${capitalizeStr(
            slug
          )} does't support alerts with metric '${nameOfMetric}'`
        )
      } else {
        showErrorAlert('')
      }
    }
  }, [slug, availableMetrics])

  const metrics = useMemo(() => {
    return getByAvailable(
      availableMetrics.some(m => m.includes('nvt'))
        ? availableMetrics.concat('nvt_5min')
        : availableMetrics,
      trigger
    )
  }, [availableMetrics, trigger])

  const allSubmetrics = useMergedTimeboundSubmetrics(availableMetrics)

  useEffect(() => {
    const submetrics = filterOnlyMetrics(allSubmetrics)
    const newCategories = getCategoryGraph(metrics, [], submetrics, isBeta)
    setCategories(newCategories)
  }, [availableMetrics, metrics, isBeta])

  const onSelectMetric = newMetric => {
    handleFormValueChange({
      field: 'metric',
      value: newMetric
    })
    handleFormValueChange({
      field: 'type',
      value: getNearestTypeByMetric(newMetric)
    })
    setIsEditMetricMode(false)
  }

  const categoriesKeys = Object.keys(categories)

  const handleSetEditMetric = value => () => {
    setIsEditMetricMode(value)
  }

  if (!isEditMetricMode) {
    const typeSelectors = values.metric.key
      ? COMMON_PROPS_FOR_METRIC
      : METRIC_TO_TYPES[values.metric.value]

    const showTypes = typeSelectors && typeSelectors.length > 1
    const { dependencies: metricValueBlocks } = values.type

    const mappedTrigger = mapFormPropsToTrigger({
      ...values
    })

    const showChart = values.target && couldShowChart(mappedTrigger.settings)

    return (
      <>
        <Steps initial={0} current={1} icons={{ process: <ConditionsIcon /> }}>
          <Steps.Step
            key={0}
            title='Choose Metric'
            description={
              <div className={styles.metricCard}>
                <div className={styles.metricCardTitle}>
                  {values.metric.label}
                  <Icon
                    onClick={handleSetEditMetric(true)}
                    fill='var(--jungle-green)'
                    type='edit'
                    className={styles.metricCardEditIcon}
                  />
                </div>
                {values.metric.description && (
                  <div className={styles.metricCardDescr}>
                    {values.metric.description}
                  </div>
                )}
              </div>
            }
          />
          <Steps.Step key={1} title='Conditions' description='' />
        </Steps>
        <Conditions
          values={values}
          blocks={metricValueBlocks}
          typeSelectors={typeSelectors}
          showTypes={showTypes}
          metaFormSettings={metaFormSettings}
          handleFormValueChange={handleFormValueChange}
          handleTitlesChange={handleTitlesChange}
        />
        {showChart && (
          <div className={styles.chartPreview}>
            <SignalPreview trigger={mappedTrigger} type={values.metric.value} />
          </div>
        )}
        <div className={styles.bottomActions}>
          <Button
            onClick={handleStepClick(2)}
            className={styles.submit}
            accent='positive'
          >
            Notification settings
            <Icon className={styles.submitIcon} type='pointer-right' />
          </Button>
        </div>
      </>
    )
  }

  return (
    categoriesKeys.length > 0 && (
      <>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <MetricIcon className={styles.icon} />
            Choose Metric
          </div>
          {values.metric.label && (
            <Button
              onClick={handleSetEditMetric(false)}
              className={styles.submit}
              accent='positive'
            >
              Conditions
              <Icon className={styles.submitIcon} type='pointer-right' />
            </Button>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <Search
          iconPosition='left'
          inputProps={{
            placeholder: 'Search for a metric'
          }}
          toggleMetric={onSelectMetric}
          className={styles.search}
          categories={categories}
          searchPredicate={SEARCH_PREDICATE_ONLY_METRICS}
        />
        {values.metric.label && (
          <div className={styles.selectedMetric} ref={cardRef}>
            <div className={styles.selectedMetricTitle}>
              {values.metric.label}
            </div>
            {values.metric.description && (
              <div className={styles.selectedMetricDescr}>
                {values.metric.description}
              </div>
            )}
          </div>
        )}
        <MetricsList
          list={categories}
          onSelect={onSelectMetric}
          availableMetrics={metrics}
          isBeta={isBeta}
          slug={slug}
          hasError={error}
          hasValue={values.metric.label}
          cardHeight={cardHeight}
        />
      </>
    )
  )
}

export default MetricsAndConditionsSelector
