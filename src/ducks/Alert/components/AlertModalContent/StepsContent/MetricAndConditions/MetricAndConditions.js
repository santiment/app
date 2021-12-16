import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import PageLoader from '../../../../../../components/Loader/PageLoader'
import Metrics from '../../../../../../components/Illustrations/Metrics'
import NextStep from '../NextStep/NextStep'
import StepTitle from '../StepTitle/StepTitle'
import ConditionsTitle from './ConditionsTitle/ConditionsTitle'
import MetricSelector from './MetricSelector/MetricSelector'
import { useAvailableMetrics } from '../../../../hooks/useAvailableMetrics'
import { getMetric } from '../../../../../Studio/Sidebar/utils'
import styles from './MetricAndConditions.module.scss'
import ConditionsSelector from './ConditionsSelector/ConditionsSelector'

const MetricAndConditions = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  const { values } = useFormikContext()
  const { data, loading } = useAvailableMetrics(values.settings.target.slug)
  const [selectedMetric, setSelectedMetric] = useState(
    getMetric(values.settings.metric)
  )
  const [isEditMode, setIsEditMode] = useState(false)

  function handleSelectMetric (metric) {
    setSelectedMetric(metric)
    setIsEditMode(false)
  }

  function handleNextClick () {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1])
    }
  }

  let children = (
    <>
      <div className={styles.titleWrapper}>
        <StepTitle
          icon={<Metrics />}
          title='Choose metric'
          className={styles.title}
        />
        {selectedMetric && (
          <NextStep label='Conditions' onClick={() => setIsEditMode(false)} />
        )}
      </div>
      <MetricSelector
        metrics={data.availableMetrics}
        target={values.settings.target}
        onChange={handleSelectMetric}
        selectedMetric={selectedMetric}
      />
    </>
  )

  if (!isEditMode && selectedMetric) {
    return (
      <div className={styles.conditionsWrapper}>
        <ConditionsTitle
          metric={selectedMetric}
          onClick={() => setIsEditMode(true)}
        />
        <ConditionsSelector />
        <NextStep
          onClick={handleNextClick}
          label='Notification settings'
          className={styles.nextBtn}
        />
      </div>
    )
  }

  if (loading) {
    children = (
      <PageLoader
        containerClass={styles.loaderWrapper}
        className={styles.loader}
      />
    )
  }

  return <div className={styles.wrapper}>{children}</div>
}

export default MetricAndConditions