import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import { getNearestTypeByMetric } from '../../../utils/utils'
import {
  DAILY_ACTIVE_ADDRESSES,
  METRICS_OPTIONS,
  TRENDING_WORDS
} from '../../../utils/constants'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metric: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  metaFormSettings: PropTypes.any
}

const checkPossibleTarget = ({ metaFormSettings, setFieldValue, target }) => {
  if (!target || (Array.isArray(target) && target.length === 0)) {
    setFieldValue('target', metaFormSettings.target.value)
  }
}

export const TriggerFormMetricTypes = ({
  metric,
  target,
  setFieldValue,
  metaFormSettings
}) => {
  const defaultMetric = metaFormSettings.metric

  return (
    <div className={styles.row}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <FormikLabel text='Metrics' />
        <>
          <FormikSelect
            name='metric'
            isClearable={false}
            disabled={defaultMetric.isDisabled}
            defaultValue={defaultMetric.value}
            isSearchable
            placeholder='Choose a metric'
            options={METRICS_OPTIONS}
            onChange={newMetric => {
              metric &&
                newMetric &&
                newMetric.value !== metric.value &&
                setFieldValue('type', getNearestTypeByMetric(newMetric))

              if (newMetric) {
                if (newMetric.value !== TRENDING_WORDS) {
                  if (newMetric.value === DAILY_ACTIVE_ADDRESSES) {
                    setFieldValue('target', [])
                  } else {
                    checkPossibleTarget({
                      metaFormSettings,
                      setFieldValue,
                      target
                    })
                  }
                }
              } else {
                debugger
                if (target) {
                  setFieldValue('target', '')
                }
              }
            }}
          />
        </>
      </div>
    </div>
  )
}

TriggerFormMetricTypes.propTypes = propTypes
