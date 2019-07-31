import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import {
  ETH_WALLETS_OPTIONS,
  PRICE,
  TIME_WINDOW_UNITS
} from '../../../utils/constants'
import { LastPriceComponent } from './TriggerLastPrice'
import MetricOptionsRenderer from './metricOptions/MetricOptionsRenderer'
import { TriggerTimeWindowExplanation } from './TriggerTimeWindowExplanation'
import { mapTargetObject, targetMapperWithTicker } from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  type: PropTypes.any,
  absoluteBorderRight: PropTypes.any,
  absoluteBorderLeft: PropTypes.any
}

export const TriggerFormMetricValues = ({
  values: {
    type,
    metric,
    absoluteBorderRight = 0,
    absoluteBorderLeft = 0,
    percentThreshold,
    timeWindowUnit,
    timeWindow,
    target
  },
  lastPrice,
  blocks,
  showTypes,
  metaFormSettings,
  typeSelectors
}) => {
  const isPriceMetric = metric.value === PRICE

  const mappedTargets = mapTargetObject(target, targetMapperWithTicker)
  const slugName = !Array.isArray(mappedTargets) ? mappedTargets : undefined

  const isTimeWindow = blocks.includes('timeWindow')

  const defaultType = metaFormSettings.type

  return (
    <>
      {showTypes && (
        <div
          className={cx(
            styles.row,
            styles.rowTop,
            type && blocks.includes('absoluteThreshold') && styles.rowBottom
          )}
        >
          <div
            className={cx(styles.Field, type.filledField && styles.fieldFilled)}
          >
            <FormikLabel text='Choose condition' />
            <FormikSelect
              name='type'
              isClearable={false}
              isSearchable
              disabled={defaultType.isDisabled}
              defaultValue={defaultType.value}
              placeholder='Choose a type'
              options={typeSelectors}
              optionRenderer={MetricOptionsRenderer}
              isOptionDisabled={option => !option.value}
            />
          </div>

          {type && blocks.includes('absoluteThreshold') && (
            <div className={styles.Field}>
              <FormikLabel text='Price limit' />
              <FormikInput
                name='absoluteThreshold'
                type='number'
                placeholder='Absolute value'
                prefix={isPriceMetric ? '$' : ''}
              />
              {isPriceMetric && (
                <LastPriceComponent
                  lastPrice={lastPrice}
                  slugTitle={slugName}
                />
              )}
            </div>
          )}
        </div>
      )}
      <div className={cx(styles.row, isTimeWindow && styles.rowTimeWindow)}>
        {type && blocks.includes('absoluteBorderRight') && (
          <div className={styles.Field}>
            <FormikInput
              name='absoluteBorderRight'
              type='number'
              prefix={isPriceMetric ? '$' : ''}
              min={+absoluteBorderLeft}
              step='any'
              placeholder='Upper border'
            />
            {isPriceMetric && (
              <LastPriceComponent lastPrice={lastPrice} slugTitle={slugName} />
            )}
          </div>
        )}
        {type && blocks.includes('absoluteBorderLeft') && (
          <div className={styles.Field}>
            <FormikInput
              name='absoluteBorderLeft'
              type='number'
              step='any'
              prefix={isPriceMetric ? '$' : ''}
              max={+absoluteBorderRight}
              placeholder='Lower border'
            />
          </div>
        )}

        {type && blocks.includes('percentThreshold') && (
          <div className={styles.Field}>
            <FormikLabel text='Percentage amount' inner />
            <FormikInput
              name='percentThreshold'
              type='number'
              prefix='%'
              placeholder='Percentage amount'
            />
            {isPriceMetric && (
              <LastPriceComponent lastPrice={lastPrice} slugTitle={slugName} />
            )}
          </div>
        )}

        {type && blocks.includes('walletBalanceChangeType') && (
          <div className={styles.Field}>
            <FormikLabel text='Absolute change' inner />
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

        {type && blocks.includes('threshold') && (
          <div className={styles.Field}>
            <FormikLabel text='Threshold' inner />
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
            <FormikLabel text='Time window' inner />
            <div className={styles.timeWindow}>
              <div className={styles.timeWindowInput}>
                <FormikInput
                  name='timeWindow'
                  type='number'
                  min={0}
                  placeholder='Time window'
                />
              </div>
              <div className={styles.timeWindowUnit}>
                <FormikSelect
                  name='timeWindowUnit'
                  className={styles.timeWindowUnit}
                  clearable={false}
                  placeholder='Unit'
                  options={TIME_WINDOW_UNITS}
                />
              </div>
            </div>
            {isPriceMetric && (
              <TriggerTimeWindowExplanation
                type={type}
                percent={percentThreshold}
                timeType={timeWindowUnit}
                timeValue={timeWindow}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

TriggerFormMetricValues.propTypes = propTypes
