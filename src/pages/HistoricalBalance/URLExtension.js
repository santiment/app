import { useEffect } from 'react'
import { generateSearchQuery } from '../../ducks/HistoricalBalance/url'

const URLExtension = ({ history, settings, chartAssets, priceAssets }) => {
  useEffect(
    () => {
      history.replace(
        '?' + generateSearchQuery(settings, chartAssets, priceAssets)
      )
    },
    [settings, chartAssets, priceAssets]
  )

  return null
}

export default URLExtension
