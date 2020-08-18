import React from 'react'
import cx from 'classnames'
import Input from '@santiment-network/ui/Input'
import { isPossibleEthAddress } from '../../Signals/utils/utils'
import AssetsField from '../AssetsField'
import styles from './BalanceView.module.scss'
import Address from '../../../components/WalletLink/Address'

const BalanceViewWalletAssets = ({
  address,
  assets,
  handleAssetsChange,
  handleWalletChange
}) => {
  return (
    <div className={styles.filters}>
      <div className={cx(styles.InputWrapper, styles.wallet)}>
        <label className={styles.label} htmlFor='address'>
          Wallet address
        </label>
        <Input
          className={styles.walletInput}
          value={address}
          id='address'
          autoComplete='nope'
          type='text'
          isError={!isPossibleEthAddress(address)}
          name='address'
          placeholder='Paste the address'
          onChange={handleWalletChange}
        />
        {address && (
          <div className={styles.etherscan}>
            <Address
              address={address}
              isTx={false}
              isFull
              label='Open Etherscan'
            />
          </div>
        )}
      </div>
      <div className={cx(styles.InputWrapper, styles.address)}>
        <label className={styles.label} htmlFor='slug'>
          Asset (maximum 5)
        </label>
        <AssetsField
          byAddress={address}
          defaultSelected={assets}
          onChange={handleAssetsChange}
        />
      </div>
    </div>
  )
}

export default BalanceViewWalletAssets
