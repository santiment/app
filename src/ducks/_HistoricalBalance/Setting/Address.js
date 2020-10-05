import React from 'react'
import LibInput from '@santiment-network/ui/Input'
import Setting from './Setting'
import styles from './Setting.module.scss'

export const AddressSetting = () => {
  return (
    <Setting title='Wallet address'>
      <LibInput autoComplete='off'></LibInput>
      <a
        href='https://etherscan.io/address/0x609ba2969E9A807C8f450e37909F10f88E5Fc931'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.etherscan}
      >
        Open Etherscan
      </a>
    </Setting>
  )
}

export default AddressSetting
