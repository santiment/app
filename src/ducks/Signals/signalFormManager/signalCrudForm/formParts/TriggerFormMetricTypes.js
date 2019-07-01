import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import { getNearestTypeByMetric } from '../../../utils/utils'
import { METRICS_OPTIONS, PRICE_TYPES } from '../../../utils/constants'
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
  const defaultType = metaFormSettings.type

  const typeSelectors = PRICE_TYPES[(metric || {}).value]

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
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
      {!metric.hidden && typeSelectors && typeSelectors.length > 1 && (
        <div className={styles.Field}>
          <Label accent='waterloo' className={styles.label}>
            &nbsp;
          </Label>
          <FormikSelect
            name='type'
            isClearable={false}
            isSearchable
            isDisabled={defaultType.isDisabled}
            defaultValue={defaultType.value}
            placeholder='Choose a type'
            options={typeSelectors}
            isOptionDisabled={option => !option.value}
          />
        </div>
      )}
    </div>
  )
}

TriggerFormMetricTypes.propTypes = propTypes
