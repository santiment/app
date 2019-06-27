import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
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
import { Label } from '@santiment-network/ui'

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
  frequencyTimeType
}) => {
  const defaultFrequencyType = metaFormSettings.frequencyType

  const frequencyOptions = FREQUENCY_TYPES_OPTIONS.filter(item => {
    return !item.disabledMetrics || item.disabledMetrics.indexOf(metric) === -1
  })

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <Label accent='waterloo' className={styles.label}>
          Frequency of notifications
        </Label>
        <FormikSelect
          name='frequencyType'
          isClearable={false}
          isDisabled={defaultFrequencyType.isDisabled}
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
        <Label accent='waterloo' className={styles.label}>
          &nbsp;
        </Label>
        <div className={styles.frequency}>
          <FormikSelect
            name='frequencyTimeValue'
            className={styles.frequencyTimeValue}
            isClearable={false}
            isDisabled={!frequencyType || !frequencyTimeType}
            isSearchable
            options={getFrequencyTimeValues(frequencyTimeType)}
          />
          <FormikSelect
            className={styles.frequencyTimeType}
            name='frequencyTimeType'
            isDisabled={!frequencyType}
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
