import { useEffect } from 'react'
import { generateSearchQuery } from '../../ducks/HistoricalBalance/url'

const URLExtension = ({ history, settings, chartAssets, priceAssets }) => {
  const { address } = settings

  useEffect(
    () => {
      history.replace(
        '?' + generateSearchQuery(address, chartAssets, priceAssets)
      )
    },
    [address, chartAssets, priceAssets]
  )

  return null
}

export default URLExtension
