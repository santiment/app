import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import SignalPreview from '../../../../../../../Signals/chart/preview/SignalPreview'
import styles from './ChartPreview.module.scss'

const ChartPreview = () => {
  const {
    values,
    values: {
      settings: {
        target: { slug }
      }
    }
  } = useFormikContext()

  const shouldRenderChart = slug && typeof slug === 'string'

  return (
    <div className={cx(styles.wrapper, !shouldRenderChart && styles.noChart)}>
      {shouldRenderChart ? (
        <SignalPreview type={values.type} trigger={values} />
      ) : (
        'No data'
      )}
    </div>
  )
}

export default ChartPreview
