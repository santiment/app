import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Dropdown from '@santiment-network/ui/Dropdown'
import Settings from '../../../Studio/Header/Settings'
import PaywallInfo from '../../../Studio/Chart/PaywallInfo'
import styles from './index.module.scss'

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

const Header = ({
  className,
  boundaries,
  detectedAssets = [],
  settings = {},
  setSettings,
  ...props
}) => {
  const { ticker, asset } = settings

  const defaultPriceOptions = getPriceOptions([
    [ticker, asset],
    ...detectedAssets
  ])

  const [priceOptions, setPriceOptions] = useState(defaultPriceOptions)
  const [selectedTicker, setSelectedTicker] = useState(ticker)

  //   useEffect(() => {
  //     const newPriceOptions = getPriceOptions([
  //       activePriceAsset,
  //       ...detectedAssets
  //     ])
  //
  //     setPriceOptions(newPriceOptions)
  //     setSelected(selected || activePriceAsset)
  //   }, [detectedAssets])

  const onChangePriceOption = selectedPair => {
    const ticker = selectedPair.split(SEPARATOR)[0]
    const slug = priceOptions.get(ticker)

    setSelectedTicker(ticker)
    setSettings(state => ({ ...state, asset: slug, ticker }))
  }

  const labels = getLabels([...priceOptions])

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.left}>
        <h3 className={styles.title}>Social volume score</h3>
        <PaywallInfo boundaries={boundaries} metrics={props.metrics} />
      </div>
      <div className={styles.right}>
        <Dropdown
          selected={`${selectedTicker}${SEPARATOR}USD`}
          options={labels}
          classes={dropdownClasses}
          onSelect={onChangePriceOption}
        />
        <Settings {...props} settings={settings} setSettings={setSettings} />
      </div>
    </div>
  )
}

export default Header
