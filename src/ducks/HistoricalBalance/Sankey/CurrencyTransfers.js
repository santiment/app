import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Select from '@santiment-network/ui/Search/Select/Select'
import { getCurrencyTransfers } from './currencies'
import Title from './Title'
import styles from './index.module.scss'

const EMPTY = []
const Option = ({ option, style, selectValue }) => {
  const { address, name, symbol } = option

  return (
    <Button
      key={address + name + symbol}
      variant='ghost'
      className={styles.currency}
      style={style}
      onClick={() => selectValue(option)}
    >
      {name} ({symbol})
    </Button>
  )
}

const Value = ({ value }) => {
  const { name, symbol } = value

  return (
    <div className={styles.currencies__value}>
      {name} ({symbol})
    </div>
  )
}

const CurrencyTransfers = ({ address, currency, setCurrency }) => {
  const [currencies, setCurrencies] = useState(EMPTY)

  useEffect(
    () => {
      getCurrencyTransfers(address).then(currencies => {
        setCurrency(currencies[0])
        setCurrencies(currencies)
      })
    },
    [address]
  )

  return (
    <div className={styles.currencies}>
      <Title>Currency transfers</Title>

      <Select
        options={currencies}
        value={currency || currencies[0]}
        optionRenderer={Option}
        className={styles.currencies__select}
        onChange={setCurrency}
        valueComponent={Value}
        searchable={false}
        clearable={false}
      />
    </div>
  )
}

export default CurrencyTransfers
