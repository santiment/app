import { priceSuggesters } from './price'
import { dailyActiveAddressesSuggesters } from './dailyActiveAddresses'

export const Suggestion = Object.assign(Object.create(null), {
  price_usd: {
    title: 'Price',
    suggesters: priceSuggesters
  },
  daily_active_addresses: {
    title: 'DAA',
    suggesters: dailyActiveAddressesSuggesters
  }
})
