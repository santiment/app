import { priceSuggesters } from './price'
import { dailyActiveAddressesSuggesters } from './dailyActiveAddresses'
import { socialVolumeSuggesters } from './social_volume_total'

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
    suggesters: socialVolumeSuggesters
  }
})
