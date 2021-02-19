import React from 'react'
import cx from 'classnames'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import { PRICE, TIME_WINDOW_UNITS } from '../../../utils/constants'
import { LastPriceComponent } from './TriggerLastPrice'
import MetricOptionsRenderer from './metricOptions/MetricOptionsRenderer'
import { mapTargetObject, targetMapper } from '../../../utils/utils'
import { isDailyMetric } from './metricTypes/metrics'
import styles from '../signal/TriggerForm.module.scss'

export const TriggerFormMetricValues = ({
  values: {
    type,
    metric,
    absoluteBorderRight = 0,
    absoluteBorderLeft = 0,
    target
  },
  blocks = [],
  showTypes,
  metaFormSettings,
  typeSelectors
}) => {
  const { key, value } = metric
  const isPriceMetric = value === PRICE

  const mappedTargets = mapTargetObject(target, targetMapper)
  const slugName = !Array.isArray(mappedTargets) ? mappedTargets : undefined

  const isTimeWindow = blocks.includes('timeWindow') && !isDailyMetric(key)

  const defaultType = metaFormSettings.type

  return (
    <div className={styles.metricValues}>
      {showTypes && (
        <>
          <div className={styles.Field}>
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
              <FormikLabel text={isPriceMetric ? 'Price limit' : 'Limit'} />
              <FormikInput
                name='absoluteThreshold'
                type='number'
                placeholder='Absolute value'
                prefix={isPriceMetric ? '$' : ''}
              />
              {isPriceMetric && <LastPriceComponent slugTitle={slugName} />}
            </div>
          )}
        </>
      )}

      {type && blocks.includes('absoluteBorders') && (
        <div className={styles.flexRow}>
          <AbsoluteBorders
            isPriceMetric={isPriceMetric}
            absoluteBorderRight={absoluteBorderRight}
            absoluteBorderLeft={absoluteBorderLeft}
            slugName={slugName}
          />
        </div>
      )}

      {type && blocks.includes('percentThreshold') && (
        <PercentThreshold isPriceMetric={isPriceMetric} slugName={slugName} />
      )}

      {type &&
        blocks.includes('percentThresholdLeft') &&
        blocks.includes('percentThresholdRight') && (
        <div className={styles.flexRow}>
          <PercentThresholdByBorders
            isPriceMetric={isPriceMetric}
            slugName={slugName}
          />
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

      {isTimeWindow && type && <TimeWindow />}
    </div>
  )
}

const TimeWindow = () => (
  <div className={cx(styles.Field, styles.fieldTimeWindow)}>
    <FormikLabel text='Time window' />
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
  </div>
)

const PercentThreshold = ({ isPriceMetric, slugName }) => {
  return (
    <div className={styles.Field}>
      <FormikLabel text='Percentage amount' />
      <FormikInput
        name='percentThreshold'
        type='number'
        prefix='%'
        placeholder='Percentage amount'
      />
      {isPriceMetric && <LastPriceComponent slugTitle={slugName} />}
    </div>
  )
}

const PercentThresholdByBorders = ({ isPriceMetric, slugName }) => {
  return (
    <>
      <div className={styles.Field}>
        <FormikLabel text='Moving up %' />
        <FormikInput
          name='percentThresholdLeft'
          type='number'
          prefix='%'
          placeholder='%'
        />
        {isPriceMetric && <LastPriceComponent slugTitle={slugName} />}
      </div>
      <span className={styles.or}>or</span>
      <div className={styles.Field}>
        <FormikLabel text='Moving down %' />
        <FormikInput
          name='percentThresholdRight'
          type='number'
          prefix='%'
          placeholder='%'
        />
      </div>
    </>
  )
}

const AbsoluteBorders = ({
  isPriceMetric,
  absoluteBorderRight,
  absoluteBorderLeft,
  slugName
}) => {
  return (
    <>
      <div className={styles.Field}>
        <FormikLabel text='Lower border' />
        <FormikInput
          name='absoluteBorderLeft'
          type='number'
          step='any'
          prefix={isPriceMetric ? '$' : ''}
          max={+absoluteBorderRight}
          placeholder='0'
        />
        {isPriceMetric && <LastPriceComponent slugTitle={slugName} />}
      </div>

      <span className={styles.or}>and</span>

      <div className={styles.Field}>
        <FormikLabel text='Upper border' />
        <FormikInput
          name='absoluteBorderRight'
          type='number'
          prefix={isPriceMetric ? '$' : ''}
          min={+absoluteBorderLeft}
          step='any'
          placeholder='1'
        />
      </div>
    </>
  )
}
