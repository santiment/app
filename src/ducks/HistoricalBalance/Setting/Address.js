import React, { useState, useEffect, useMemo } from 'react'
import LibInput from '@santiment-network/ui/Input'
import Setting from './Setting'
import styles from './Setting.module.scss'

export const AddressSetting = ({ address, isError, onAddressChange }) => {
  const [value, setValue] = useState(address)
  const isInputWrong = useMemo(() => !value, [value])

  useEffect(
    () => {
      if (value === address || isInputWrong) return

      const timer = setTimeout(() => onAddressChange(value), 250)
      return () => clearTimeout(timer)
    },
    [value]
  )

  function onChange ({ target: { value } }) {
    setValue(value)
  }

  return (
    <Setting title='Wallet address'>
      <LibInput
        autoComplete='off'
        value={value}
        isError={isError || isInputWrong}
        onChange={onChange}
      />
      {address && (
        <a
          href={`https://etherscan.io/address/${address}`}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.etherscan}
        >
          Open Etherscan
        </a>
      )}
    </Setting>
  )
}

export default AddressSetting
