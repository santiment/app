import React from 'react'
import SignalPreview from '../../../../../../../Signals/chart/preview/SignalPreview'
import styles from './ChartPreview.module.scss'
import { useFormikContext } from 'formik'

const ChartPreview = () => {
  const { values } = useFormikContext()
  return (
    <div className={styles.wrapper}>
      <SignalPreview type={values.type} trigger={values} />
    </div>
  )
}

export default ChartPreview
