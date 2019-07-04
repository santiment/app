import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import Label from '@santiment-network/ui/Label'
import {
  ETH_WALLETS_OPTIONS,
  METRIC_TYPES_DEPENDENCIES,
  TIME_WINDOW_UNITS
} from '../../../utils/constants'
import { getFormMetricValue } from '../../../utils/utils'
import { LastPriceComponent } from './TriggerLastPrice'
import { TriggerTimeWindowExplanation } from './TriggerTimeWindowExplanation'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  type: PropTypes.any,
  absoluteBorderRight: PropTypes.any,
  absoluteBorderLeft: PropTypes.any
}

export const TriggerFormMetricValues = ({
  values: {
    type,
    absoluteBorderRight = 0,
    absoluteBorderLeft = 0,
    percentThreshold,
    timeWindowUnit,
    timeWindow
  },
  lastPrice
}) => {
  const metricValue = getFormMetricValue(type)
  const isTimeWindow = METRIC_TYPES_DEPENDENCIES[metricValue].includes(
    'timeWindow'
  )

  return (
    <div className={cx(styles.row, isTimeWindow ? styles.rowTimeWindow : '')}>
      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'absoluteBorderRight'
        ) && (
        <div className={styles.Field}>
          <FormikInput
            name='absoluteBorderRight'
            type='number'
            min={+absoluteBorderLeft}
            step='any'
            placeholder='Upper border'
          />
          <LastPriceComponent lastPrice={lastPrice} />
        </div>
      )}
      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'absoluteBorderLeft'
        ) && (
        <div className={styles.Field}>
          <FormikInput
            name='absoluteBorderLeft'
            type='number'
            step='any'
            max={+absoluteBorderRight}
            placeholder='Lower border'
          />
        </div>
      )}

      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'absoluteThreshold'
        ) && (
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <FormikInput
            name='absoluteThreshold'
            type='number'
            placeholder='Absolute value'
          />
          <LastPriceComponent lastPrice={lastPrice} />
        </div>
      )}

      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes('percentThreshold') && (
        <div className={styles.Field}>
          <Label accent='waterloo' className={styles.label}>
              Percentage amount
          </Label>
          <FormikInput
            name='percentThreshold'
            type='number'
            placeholder='Percentage amount'
          />
          <LastPriceComponent lastPrice={lastPrice} />
        </div>
      )}

      {type &&
        METRIC_TYPES_DEPENDENCIES[metricValue].includes(
          'walletBalanceChangeType'
        ) && (
        <div className={styles.Field}>
          <Label accent='waterloo' className={styles.label}>
              Absolute change
          </Label>
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
          <Label accent='waterloo' className={styles.label}>
            Threshold
          </Label>
          <FormikInput
            name='threshold'
            step={0.001}
            type='number'
            placeholder='Threshold'
          />
        </div>
      )}
      {type && isTimeWindow && (
        <div className={cx(styles.Field, styles.fieldTimeWindow)}>
          <Label accent='waterloo' className={styles.label}>
            Time window
          </Label>
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
          <TriggerTimeWindowExplanation
            type={type}
            percent={percentThreshold}
            timeType={timeWindowUnit}
            timeValue={timeWindow}
          />
        </div>
      )}
    </div>
  )
}

TriggerFormMetricValues.propTypes = propTypes
