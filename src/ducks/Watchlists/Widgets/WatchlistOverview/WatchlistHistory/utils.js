import { formatNumber } from '../../../../../utils/formatting'
import { calcPercentageChange } from '../../../../../utils/utils'

const currencyFormatOptions = {
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: 'decimal'
}

export const statsForGraphics = arr => {
  const minMarketcap = Math.min(...arr.map(({ marketcap }) => marketcap))
  const minVolume = Math.min(...arr.map(({ volume }) => volume))
  return arr.map(item => ({
    ...item,
    marketcap: item.marketcap - minMarketcap,
    volume: item.volume - minVolume
  }))
}

export const getRelativeMarketcapInPercents = (total, part) =>
  ((part * 100) / total).toFixed(2)

export const generateWidgetData = historyPrice => {
  if (!historyPrice || historyPrice.length === 0) return {}

  const { marketcap: latestMarketcap, volume: latestVolume } = historyPrice[
    historyPrice.length - 1
  ]

  const { marketcap, volume } = historyPrice[0]

  const marketcapFormatted = formatNumber(
    latestMarketcap,
    currencyFormatOptions
  )
  const volumeFormatted = formatNumber(latestVolume, currencyFormatOptions)

  const marketcapChanges = calcPercentageChange(marketcap, latestMarketcap)
  const volumeChanges = calcPercentageChange(volume, latestVolume)

  const chartStats = statsForGraphics(historyPrice)

  return {
    latestMarketcap,
    marketcapFormatted,
    volumeFormatted,
    chartStats,
    volumeChanges,
    marketcapChanges
  }
}
