import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import { getNearestTypeByMetric } from '../../../utils/utils'
import { METRICS_OPTIONS } from '../../../utils/constants'
import Label from '@santiment-network/ui/Label'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metric: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  metaFormSettings: PropTypes.any
}

export const TriggerFormMetricTypes = ({
  metric,
  setFieldValue,
  metaFormSettings
}) => {
  const defaultMetric = metaFormSettings.metric

  return (
    <div className={styles.row}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <Label accent='waterloo' className={styles.label}>
          Metrics
        </Label>
        <div>
          <FormikSelect
            name='metric'
            isClearable={false}
            isDisabled={defaultMetric.isDisabled}
            defaultValue={defaultMetric.value}
            isSearchable
            placeholder='Choose a metric'
            options={METRICS_OPTIONS}
            onChange={newMetric => {
              metric &&
                newMetric.value !== metric.value &&
                setFieldValue('type', getNearestTypeByMetric(newMetric))
            }}
          />
        </div>
      </div>
    </div>
  )
}

TriggerFormMetricTypes.propTypes = propTypes
