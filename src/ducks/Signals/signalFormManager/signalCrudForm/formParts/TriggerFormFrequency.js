import React from 'react'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import {
  FREQUENCY_TYPES,
  frequencyTymeValueBuilder,
  getFrequencyTimeType,
  getFrequencyTimeValues,
  getNearestFrequencyTimeValue,
  getNearestFrequencyTypeValue
} from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const propTypes = {
  metaFormSettings: PropTypes.any.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  frequencyType: PropTypes.any,
  frequencyTimeType: PropTypes.any
}

export const TriggerFormFrequency = ({
  metaFormSettings,
  setFieldValue,
  frequencyType,
  frequencyTimeType
}) => {
  const defaultFrequencyType = metaFormSettings.frequencyType

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <label>Frequency of notifications</label>
        <FormikSelect
          name='frequencyType'
          isClearable={false}
          isDisabled={defaultFrequencyType.isDisabled}
          defaultValue={defaultFrequencyType.value.value}
          isSearchable
          placeholder='Choose frequency'
          options={FREQUENCY_TYPES}
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
