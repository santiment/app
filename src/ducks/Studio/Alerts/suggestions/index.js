import { buildPercentUpSuggester, buildValueChangeSuggester } from './helpers'
import { dailyActiveAddressesSuggesters } from './dailyActiveAddresses'
import { Metric } from '../../../dataHub/metrics'

export const Suggestion = Object.assign(Object.create(null), {
  price_usd: {
    title: 'Price',
    suggesters: [
      buildValueChangeSuggester(Metric.price_usd),
      buildPercentUpSuggester(Metric.price_usd)
    ]
  },
  daily_active_addresses: {
    title: 'DAA',
    suggesters: dailyActiveAddressesSuggesters
  },
  social_volume_total: {
    title: 'Social Volume',
    suggesters: [
      buildValueChangeSuggester(Metric.social_volume_total),
      buildPercentUpSuggester(Metric.social_volume_total)
    ]
  },
  transaction_volume: {
    title: 'Transaction Volume',
    suggesters: [
      buildValueChangeSuggester(Metric.transaction_volume),
      buildPercentUpSuggester(Metric.transaction_volume)
    ]
  },
  exchange_balance: {
    title: 'Exchange Balance',
    suggesters: [
      buildValueChangeSuggester(Metric.exchange_balance),
      buildPercentUpSuggester(Metric.exchange_balance)
    ]
  }
})
