import { priceSuggesters } from './price'

export const Suggestion = Object.assign(Object.create(null), {
  price_usd: {
    title: 'Price',
    suggesters: priceSuggesters
  }
})
