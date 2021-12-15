import React from 'react'
import { useFormikContext } from 'formik'
import PageLoader from '../../../../../../components/Loader/PageLoader'
import Metrics from '../../../../../../components/Illustrations/Metrics'
import StepTitle from '../StepTitle/StepTitle'
import MetricSelector from './MetricSelector/MetricSelector'
import { useAvailableMetrics } from '../../../../hooks/useAvailableMetrics'
import styles from './MetricAndConditions.module.scss'

const MetricAndConditions = () => {
  const { values } = useFormikContext()
  const { data, loading } = useAvailableMetrics(values.settings.target.slug)

  let children = (
    <>
      <div className={styles.titleWrapper}>
        <StepTitle
          icon={<Metrics />}
          title='Choose metric'
          className={styles.title}
        />
      </div>
      <MetricSelector
        metrics={data.availableMetrics}
        target={values.settings.target}
      />
    </>
  )

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
