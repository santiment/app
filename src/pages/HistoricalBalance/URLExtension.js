import { useEffect } from 'react'
import {
  parseUrl,
  generateSearchQuery
} from '../../ducks/HistoricalBalance/url'

const URLExtension = ({
  history,
  settings,
  chartAssets,
  priceAssets,
  isLog,
  onAddressChange
}) => {
  const { search } = history.location

  useEffect(
    () => {
      const { address } = parseUrl(search).settings
      if (address !== settings.address) {
        onAddressChange(address)
      }
    },
    [search]
  )

  useEffect(
    () => {
      history.replace(
        '?' + generateSearchQuery(settings, chartAssets, priceAssets, isLog)
      )
    },
    [settings, chartAssets, priceAssets, isLog]
  )

  return null
}

export default URLExtension
