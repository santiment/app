import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import {
  ETH_WALLETS_OPTIONS,
  METRIC_TYPES_DEPENDENCIES
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
          <label>Select channel borders</label>
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
          <label>&nbsp;</label>
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
          <label>Absolute change</label>
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
          <label>Percentage change</label>
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
          <label>Condition</label>
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
          <label>Threshold</label>
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
          <label>Time window</label>
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
              options={[
                { value: 'h', label: 'Hours' },
                { value: 'd', label: 'Days' }
              ]}
            />
          </div>
        </div>
      )}
    </div>
  )
}

TriggerFormMetricValues.propTypes = propTypes
