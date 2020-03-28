import React, { useState, useEffect } from 'react'
import Dropdown from '@santiment-network/ui/Dropdown'
import styles from './PricePairsDropdown.module.scss'

const dropdownClasses = {
  wrapper: styles.dropdown,
  options: styles.dropdownOptions,
  option: styles.dropdownOption
}

const SEPARATOR = ' / '

export const Assets = [['BTC', 'bitcoin'], ['ETH', 'ethereum']]

const getPriceOptions = assets => {
  const options = new Map(Assets)

  assets.map(([ticker, slug]) => options.set(ticker, slug))

  return options
}

const getLabels = options =>
  options.map(([ticker]) => `${ticker}${SEPARATOR}USD`)

const PricePairsDropdown = ({ detectedAsset, settings, setSettings }) => {
  const { ticker, asset: slug } = settings

  const defaultPriceOptions = getPriceOptions([[ticker, slug]])

  const [priceOptions, setPriceOptions] = useState(defaultPriceOptions)
  const [selectedTicker, setSelectedTicker] = useState(ticker)

  useEffect(
    () => {
      if (detectedAsset) {
        const newPriceOptions = getPriceOptions([
          [ticker, slug],
          [detectedAsset.ticker, detectedAsset.slug]
        ])

        setPriceOptions(newPriceOptions)
      }
    },
    [detectedAsset]
  )

  const onChangePriceOption = selectedPair => {
    const ticker = selectedPair.split(SEPARATOR)[0]
    const slug = priceOptions.get(ticker)

    setSelectedTicker(ticker)
    setSettings(state => ({ ...state, asset: slug, ticker }))
  }

  const labels = getLabels([...priceOptions])
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
