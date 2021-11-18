import { buildPercentUpSuggester, buildValueChangeSuggester } from './helpers'
import { dailyActiveAddressesSuggesters } from './dailyActiveAddresses'
import { Metric } from '../../../dataHub/metrics'

const priceTransformer = ({ slug, asset = slug }) => ({
  slug: asset,
  selector: 'slug'
})

export const Suggestion = Object.assign(Object.create(null), {
  price_usd: {
    title: 'Price',
    suggesters: [
      buildValueChangeSuggester(Metric.price_usd, priceTransformer),
      buildPercentUpSuggester(Metric.price_usd, priceTransformer)
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
    title: 'Exchange Flow Balance',
    suggesters: [
      buildValueChangeSuggester(Metric.exchange_balance),
      buildPercentUpSuggester(Metric.exchange_balance)
    ]
  },
  volume_usd: {
    title: 'Volume',
    suggesters: [
      buildValueChangeSuggester(Metric.volume_usd),
      buildPercentUpSuggester(Metric.volume_usd)
    ]
  }
})
