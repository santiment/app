import React, { useState, useEffect, useMemo } from 'react'
import Button from '@santiment-network/ui/Button'
import Select from '@santiment-network/ui/Search/Select/Select'
import { getCurrencyTransfers } from './currencies'
import Title from './Title'
import { useProjects } from '../../../stores/projects'
import styles from './index.module.scss'

const EMPTY = []
const useTickerRank = projects =>
  useMemo(
    () => {
      const TickerRank = {}
      for (let i = 0; i < projects.length; i++) {
        TickerRank[projects[i].ticker] = i + 1
      }
      return TickerRank
    },
    [projects]
  )

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
  const { projects } = useProjects()
  const TickerRank = useTickerRank(projects)
  const [rawCurrencies, setCurrencies] = useState(EMPTY)
  const currencies = useMemo(
    () => {
      if (projects.length === 0) return rawCurrencies

      const sorted = rawCurrencies
        .slice()
        .sort(
          ({ symbol: a }, { symbol: b }) =>
            (TickerRank[a] || 99999) - (TickerRank[b] || 99999)
        )

      setCurrency(sorted[0])
      return sorted
    },
    [rawCurrencies, TickerRank]
  )

  useEffect(
    () => {
      getCurrencyTransfers(address).then(currencies => {
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
        value={currency}
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
