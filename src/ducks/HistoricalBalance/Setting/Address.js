import React, { useState, useEffect, useMemo } from 'react'
import Input from '@santiment-network/ui/Input'
import Setting from './Setting'
import {
  Infrastructure,
  getAddressInfrastructure
} from '../../../utils/address'
import styles from './Setting.module.scss'

export const AddressSetting = ({ address, isError, onAddressChange }) => {
  const [value, setValue] = useState(address)
  const infrastructure = useMemo(() => getAddressInfrastructure(value), [value])

  useEffect(
    () => {
      if (value === address || !infrastructure) return

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
      <Input
        autoComplete='off'
        value={value}
        isError={isError || !infrastructure}
        onChange={onChange}
      />
      {address && infrastructure === Infrastructure.ETH && (
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
