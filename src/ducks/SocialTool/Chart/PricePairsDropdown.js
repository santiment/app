import React, { useState, useEffect } from 'react'
import Dropdown from '@santiment-network/ui/Dropdown'
import styles from './PricePairsDropdown.module.scss'

const dropdownClasses = {
  wrapper: styles.dropdown,
  options: styles.dropdownOptions,
  option: styles.dropdownOption
}

const SEPARATOR = ' / '

export const TICKER_SLUG_PAIRS = [['BTC', 'bitcoin'], ['ETH', 'ethereum']]

const getPriceOptions = assets => {
  const options = new Map(TICKER_SLUG_PAIRS)

  assets.map(([ticker, slug]) => options.set(ticker, slug))

  return options
}

const getLabels = options =>
  options.map(([ticker]) => `${ticker}${SEPARATOR}USD`)

const PricePairsDropdown = ({
  allDetectedAssets,
  settings,
  setSettings,
  setPriceAsset,
  priceAsset
}) => {
  const { ticker, asset: slug } = settings
  const defaultPriceOptions = getPriceOptions([[ticker, slug]])

  const [priceOptions, setPriceOptions] = useState(defaultPriceOptions)
  const [selectedTicker, setSelectedTicker] = useState(ticker)

  const labels = getLabels([...priceOptions])

  if (!priceAsset) {
    setPriceAsset({ slug, label: `${ticker}${SEPARATOR}USD` })
  }

  useEffect(
    () => {
      if (allDetectedAssets.size > 0) {
        const pairs = []
        allDetectedAssets.forEach(pair => {
          if (pair) {
            pairs.push([pair.ticker, pair.slug])
          }
        })
        const newPriceOptions = getPriceOptions([[ticker, slug], ...pairs])

        setPriceOptions(newPriceOptions)
      }
    },
    [allDetectedAssets]
  )

  function onChangePriceOption (selectedPair) {
    const ticker = selectedPair.split(SEPARATOR)[0]
    const slug = priceOptions.get(ticker)

    setSelectedTicker(ticker)
    setPriceAsset({ slug, label: `${ticker}${SEPARATOR}USD` })
    setSettings(state => ({ ...state, asset: slug, ticker }))
  }

  return (
    <Dropdown
      selected={`${selectedTicker}${SEPARATOR}USD`}
      options={labels}
      classes={dropdownClasses}
      onSelect={onChangePriceOption}
    />
  )
}

export default PricePairsDropdown
