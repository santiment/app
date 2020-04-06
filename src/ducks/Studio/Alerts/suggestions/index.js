import {
  priceSuggesters,
  suggestPercentUpDown,
  suggestValueChange
} from './price'
import { dailyActiveAddressesSuggesters } from './dailyActiveAddresses'
import { Metric } from '../../../dataHub/metrics'

export const Suggestion = Object.assign(Object.create(null), {
  price_usd: {
    title: 'Price',
    suggesters: priceSuggesters
  },
  daily_active_addresses: {
    title: 'DAA',
    suggesters: dailyActiveAddressesSuggesters
  },
  social_volume_total: {
    title: 'Social Volume',
    suggesters: [
      suggestValueChange(Metric.social_volume_total),
      suggestPercentUpDown(Metric.social_volume_total)
    ]
  },
  transaction_volume: {
    title: 'Transaction Volume',
    suggesters: [
      suggestValueChange(Metric.transaction_volume),
      suggestPercentUpDown(Metric.transaction_volume)
    ]
  },
  exchange_balance: {
    title: 'Exchange Balance',
    suggesters: [
      suggestValueChange(Metric.exchange_balance),
      suggestPercentUpDown(Metric.exchange_balance)
    ]
  }
})
