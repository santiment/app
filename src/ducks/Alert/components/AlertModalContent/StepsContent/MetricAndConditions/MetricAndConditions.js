import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import PageLoader from '../../../../../../components/Loader/PageLoader'
import NextStep from '../NextStep/NextStep'
import StepTitle from '../StepTitle/StepTitle'
import ConditionsTitle from './ConditionsTitle/ConditionsTitle'
import MetricSelector from './MetricSelector/MetricSelector'
import ConditionsSelector from './ConditionsSelector/ConditionsSelector'
import { useAvailableMetrics } from '../../../../hooks/useAvailableMetrics'
import { getMetric } from '../../../../../Studio/Sidebar/utils'
import styles from './MetricAndConditions.module.scss'

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
        <StepTitle title='Choose Metric' className={styles.title} />
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
          handleNextClick={handleNextClick}
        />
        <StepTitle title='Conditions' size='s' />
        <ConditionsSelector metric={selectedMetric} />
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
