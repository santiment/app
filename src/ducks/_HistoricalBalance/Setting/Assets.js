import React from 'react'
import Select from '@santiment-network/ui/Search/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import Setting from './Setting'
import { WalletBalanceOptionRenderer } from '../../Signals/signalFormManager/signalCrudForm/formParts/metricOptions/MetricOptionsRenderer'
import styles from './Setting.module.scss'

export const AddressSetting = ({
  className,
  walletAssets,
  chartAssets,
  isLoading,
  setChartAssets,
}) => {
  return (
    <Setting className={className} title='Wallet address'>
      <div className={styles.assets}>
        <Select
          multi
          placeholder='For example, Ethereum...'
          options={walletAssets}
          valueKey='slug'
          labelKey='slug'
          value={chartAssets}
          optionRenderer={WalletBalanceOptionRenderer}
          onChange={setChartAssets}
        ></Select>
        {isLoading && <Loader className={styles.loader} />}
      </div>
    </Setting>
  )
}

export default AddressSetting
