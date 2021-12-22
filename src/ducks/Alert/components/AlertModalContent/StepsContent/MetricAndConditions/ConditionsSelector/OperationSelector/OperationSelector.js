import React, { useEffect, useState } from 'react'
import { useField } from 'formik'
import cx from 'classnames'
import Select from '@santiment-network/ui/Select/Select'
import OperationInput from './OperationInput/OperationInput'
import OperationValue from './OperationValue/OperationValue'
import { parseOperation } from '../../../../../../utils'
import {
  AVAILABLE_OPERATIONS,
  MULTIPLE_VALUES_OPERATIONS,
  PERCENT_OPERATIONS
} from './constants'
import { formatOptionLabel } from './utils'
import styles from './OperationSelector.module.scss'

function getCountDefault (value) {
  return MULTIPLE_VALUES_OPERATIONS.includes(value) ? [1, 1] : 1
}

const OperationSelector = ({ metric }) => {
  const [, { value }, { setValue }] = useField('settings.operation')
  const { selectedCount, selectedOperation } = parseOperation(value)
  const [operation, setOperation] = useState(
    (selectedOperation &&
      AVAILABLE_OPERATIONS.find(op => op.value === selectedOperation)) ||
      AVAILABLE_OPERATIONS[0]
  )
  const [count, setCount] = useState(
    selectedCount || getCountDefault(operation)
  )

  function handleChangeOperation ({ label, value }) {
    setOperation({ label, value })
    setCount(getCountDefault(value))
  }

  useEffect(() => {
    if (operation.value === 'some_of') {
      setValue({
        [operation.value]: [
          { percent_up: count[0] },
          { percent_down: count[1] }
        ]
      })
    } else {
      setValue({ [operation.value]: count })
    }
  }, [operation, count])

  const hasPriceIcon = metric.category === 'Financial'
  const isPercentIcon = PERCENT_OPERATIONS.includes(operation.value)
  const isMultipleValues = MULTIPLE_VALUES_OPERATIONS.includes(operation.value)

  return (
    <div className={cx(styles.wrapper, isMultipleValues && styles.multiple)}>
      <Select
        isClearable={false}
        isSearchable={false}
        className={styles.operation}
        options={AVAILABLE_OPERATIONS}
        formatOptionLabel={formatOptionLabel}
        value={operation}
        onChange={handleChangeOperation}
        components={{ SingleValue: OperationValue }}
      />
      <OperationInput
        count={count}
        setCount={setCount}
        operation={operation.value}
        hasIcon={hasPriceIcon || isPercentIcon}
        iconType={isPercentIcon && 'percent'}
        className={styles.inputs}
      />
    </div>
  )
}

export default OperationSelector
