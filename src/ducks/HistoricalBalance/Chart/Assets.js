import React, { useMemo } from 'react'
import Select from '@santiment-network/ui/Select/Select'
import Loader from '@santiment-network/ui/Loader/Loader'
import Setting from '../Setting'
import { ASSETS_LIMIT } from '../defaults'
import { WalletBalanceOptionRenderer } from '../../Signals/signalFormManager/signalCrudForm/formParts/metricOptions/MetricOptionsRenderer'
import styles from './index.module.scss'

export const AddressSetting = ({
  className,
  walletAssets,
  chartAssets,
  isLoading,
  setChartAssets,
}) => {
  const selectedSlugs = chartAssets.map(({ slug }) => slug)
  const options = useMemo(
    () =>
      walletAssets
        .filter((item) => !selectedSlugs.includes(item.slug))
        .map((item) => ({ label: item.slug, value: item })),
    [walletAssets, selectedSlugs],
  )
  const value = chartAssets.map((item) => ({ label: item.slug, value: item }))

  return (
    <Setting className={className} title={`Asset (maximum ${ASSETS_LIMIT})`}>
      <div className={styles.assets}>
        <Select
          hideSelectedOptions
          isMulti
          placeholder='For example, Ethereum...'
          options={chartAssets.length < ASSETS_LIMIT ? options : []}
          getOptionValue={(val) => val}
          value={value}
          optionRenderer={WalletBalanceOptionRenderer}
          onChange={setChartAssets}
        />
        {isLoading && <Loader className={styles.loader} />}
      </div>
    </Setting>
  )
}

export default AddressSetting
