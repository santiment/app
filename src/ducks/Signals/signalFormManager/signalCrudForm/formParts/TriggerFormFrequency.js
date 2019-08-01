import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import {
  getFrequencyTimeType,
  getFrequencyTimeValues,
  getNearestFrequencyTimeValue,
  getNearestFrequencyTypeValue
} from '../../../utils/utils'
import {
  FREQUENCY_TYPES_OPTIONS,
  frequencyTymeValueBuilder
} from '../../../utils/constants'
import styles from '../signal/TriggerForm.module.scss'
import cx from 'classnames'

const propTypes = {
  metaFormSettings: PropTypes.any.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  frequencyType: PropTypes.any,
  frequencyTimeType: PropTypes.any
}

export const TriggerFormFrequency = ({
  metaFormSettings,
  setFieldValue,
  metric,
  frequencyType,
  frequencyTimeType,
  disabled = false
}) => {
  const defaultFrequencyType = metaFormSettings.frequencyType

  const frequencyOptions = FREQUENCY_TYPES_OPTIONS.filter(item => {
    return !item.disabledMetrics || item.disabledMetrics.indexOf(metric) === -1
  })

  return (
    <div className={cx(styles.row, styles.rowTop)}>
      <div className={styles.Field}>
        <FormikLabel text='Frequency of notifications' />
        <FormikSelect
          name='frequencyType'
          isClearable={false}
          disabled={disabled || defaultFrequencyType.isDisabled}
          defaultValue={defaultFrequencyType.value.value}
          isSearchable
          placeholder='Choose a frequency'
          options={frequencyOptions}
          onChange={frequencyType => {
            const newFrequencyTimeType = getNearestFrequencyTypeValue(
              frequencyType
            )
            setFieldValue('frequencyTimeType', newFrequencyTimeType)
            setFieldValue(
              'frequencyTimeValue',
              getNearestFrequencyTimeValue(newFrequencyTimeType)
            )
          }}
        />
      </div>
      <div className={styles.Field}>
        <FormikLabel />
        <div className={styles.frequency}>
          <FormikSelect
            name='frequencyTimeValue'
            className={styles.frequencyTimeValue}
            isClearable={false}
            disabled={disabled || !frequencyType || !frequencyTimeType}
            isSearchable
            options={getFrequencyTimeValues(frequencyTimeType)}
          />
          <FormikSelect
            disabled={disabled || !frequencyType}
            className={styles.frequencyTimeType}
            name='frequencyTimeType'
            isClearable={false}
            onChange={frequencyTimeType => {
              setFieldValue('frequencyTimeValue', frequencyTymeValueBuilder(1))
            }}
            options={getFrequencyTimeType(frequencyType)}
          />
        </div>
      </div>
    </div>
  )
}

TriggerFormFrequency.propTypes = propTypes
