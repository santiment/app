import { useEffect } from 'react'
import { generateSearchQuery } from '../../ducks/HistoricalBalance/url'

const URLExtension = ({
  history,
  settings,
  chartAssets,
  priceAssets,
  isLog
}) => {
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
