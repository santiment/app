import React, { useEffect, useState } from 'react'
import { useField, useFormikContext } from 'formik'
import cx from 'classnames'
import Select from '@santiment-network/ui/Select/Select'
import OperationInput from './OperationInput/OperationInput'
import { useLastPrice } from '../../../../../../hooks/useLastPrice'
import { formatNumber } from '../../../../../../../../utils/formatting'
import { getConditionsStr } from '../../../../../../utils'
import { AVAILABLE_OPERATIONS, MULTIPLE_VALUES_OPERATIONS } from './constants'
import { formatOptionLabel } from './utils'
import styles from './OperationSelector.module.scss'

function getCountDefault (value) {
  return MULTIPLE_VALUES_OPERATIONS.includes(value) ? [1, 1] : 1
}

const OperationSelector = () => {
  const { values } = useFormikContext()
  const slug = values.settings.target.slug
  const { data, loading } = useLastPrice(slug)
  const [, { value }, { setValue }] = useField('settings.operation')
  const selectedOperation = Object.keys(value)[0]
  const selectedCount = value[selectedOperation]
  const [operation, setOperation] = useState(
    (selectedOperation &&
      AVAILABLE_OPERATIONS.find(op => op.value === selectedOperation)) ||
      AVAILABLE_OPERATIONS[0]
  )
  const [count, setCount] = useState(
    selectedCount || getCountDefault(operation)
  )
  const shouldRenderPrice = !Array.isArray(slug)

  function handleChangeOperation ({ label, value }) {
    setOperation({ label, value })
    setCount(getCountDefault(value))
  }

  useEffect(() => {
    setValue({ [operation.value]: count })
  }, [operation, count])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputsCol}>
        <div className={styles.condition}>
          {getConditionsStr({
            operation: operation.value,
            count,
            timeWindow: values.settings.time_window
          })}
        </div>
        <Select
          isClearable={false}
          isSearchable={false}
          className={cx(
            styles.operation,
            MULTIPLE_VALUES_OPERATIONS.includes(operation.value) &&
              styles.fullWidth
          )}
          options={AVAILABLE_OPERATIONS}
          formatOptionLabel={formatOptionLabel}
          value={operation}
          onChange={handleChangeOperation}
        />
      </div>
      <div className={cx(styles.inputsCol)}>
        <div className={styles.price}>
          {!loading &&
            shouldRenderPrice &&
            `1 ${slug} = ${formatNumber(data, { currency: 'USD' })}`}
        </div>
        <OperationInput count={count} setCount={setCount} />
      </div>
    </div>
  )
}

export default OperationSelector