import React, { useMemo } from 'react'
import cx from 'classnames'
import { Selector } from '@santiment-network/ui'
import styles from './DexPriceMeasurement.module.scss'

export const DEX_BY_USD = { slug: 'multi-collateral-dai', label: 'USD' }
export const DEX_PRICE_SELECTORS = [
  DEX_BY_USD,
  { slug: 'ethereum', label: 'ETH' },
  { slug: 'bitcoin', label: 'BTC' }
]

const DexPriceMeasurement = ({ onSelect, defaultSelected, className }) => {
  const options = useMemo(
    () => {
      return DEX_PRICE_SELECTORS.map(({ label }) => label)
    },
    [DEX_PRICE_SELECTORS]
  )

  const { label } = defaultSelected || DEX_PRICE_SELECTORS[0]

  return (
    <Selector
      className={cx(styles.selectors, className)}
      options={options}
      onSelectOption={value => {
        const found = DEX_PRICE_SELECTORS.find(({ label }) => label === value)

        if (found) {
          onSelect(found)
        }
      }}
      defaultSelected={label}
    />
  )
}

export default DexPriceMeasurement
