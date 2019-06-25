import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import {
  ETH_WALLETS_OPTIONS,
  METRIC_TYPES_DEPENDENCIES,
  TIME_WINDOW_UNITS
} from '../../../utils/constants'
import { getFormMetricValue } from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  type: PropTypes.any,
  absoluteBorderRight: PropTypes.number,
  absoluteBorderLeft: PropTypes.number
}

export const TriggerFormMetricValues = ({
  type,
  absoluteBorderRight,
  absoluteBorderLeft
}) => {
  let metricValue = getFormMetricValue(type)

  return (
    <div className={styles.row}>
      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'absoluteBorderLeft'
        ) && (
        <div className={styles.Field}>
          <div className={styles.label}>Select channel borders</div>
          <FormikInput
            name='absoluteBorderLeft'
            type='number'
            max={absoluteBorderRight}
            placeholder='Left border'
          />
        </div>
      )}
      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'absoluteBorderRight'
        ) && (
        <div className={styles.Field}>
          <div className={styles.label}>&nbsp;</div>
          <FormikInput
            name='absoluteBorderRight'
            min={absoluteBorderLeft}
            type='number'
            placeholder='Right border'
          />
        </div>
      )}

      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'absoluteThreshold'
        ) && (
        <div className={styles.Field}>
          <div className={styles.label}>Absolute change</div>
          <FormikInput
            name='absoluteThreshold'
            type='number'
            placeholder='Absolute change'
          />
        </div>
      )}

      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes('percentThreshold') && (
        <div className={styles.Field}>
          <div className={styles.label}>Percentage change</div>
          <FormikInput
            name='percentThreshold'
            type='number'
            placeholder='Percentage change'
          />
        </div>
      )}

      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'walletBalanceChangeType'
        ) && (
        <div className={styles.Field}>
          <div className={styles.label}>Condition</div>
          <div>
            <FormikSelect
              name='type'
              clearable={false}
              placeholder='Choose a type'
              options={ETH_WALLETS_OPTIONS}
            />
          </div>
        </div>
      )}

      {type && METRIC_TYPES_DEPENDENCIES[metricValue].includes('threshold') && (
        <div className={styles.Field}>
          <div className={styles.label}>Threshold</div>
          <FormikInput
            name='threshold'
            step={0.001}
            type='number'
            placeholder='Threshold'
          />
        </div>
      )}
      {type && METRIC_TYPES_DEPENDENCIES[metricValue].includes('timeWindow') && (
        <div className={styles.Field}>
          <div className={styles.label}>Time window</div>
          <div className={styles.timeWindow}>
            <div className={styles.timeWindowInput}>
              <FormikInput
                name='timeWindow'
                type='number'
                min={0}
                placeholder='Time window'
              />
            </div>
            <FormikSelect
              name='timeWindowUnit'
              className={styles.timeWindowUnit}
              clearable={false}
              placeholder='Unit'
              options={TIME_WINDOW_UNITS}
            />
          </div>
        </div>
      )}
    </div>
  )
}

TriggerFormMetricValues.propTypes = propTypes
