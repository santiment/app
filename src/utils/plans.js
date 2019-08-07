export const formatPrice = (price, name, billing) => {
  if (name === 'FREE') return ['$0']
  if (!price) return ['Custom']

  const devider = 100 * (billing === 'year' ? 12 : 1)

  return [`$${parseInt(price / devider, 10)}`, '/mo']
}

const sanbaseProductId = '2'
export const findSanbasePlan = ({ id }) => id === sanbaseProductId

export const getCurrentSanbaseSubscription = user => {
  if (!user) return
  const { subscriptions: subs } = user

  return subs.find(
    ({
      plan: {
        product: { id }
      }
    }) => id === sanbaseProductId
  )
}

export const getAlternativeBillingPlan = (
  plans,
  currentPlan,
  currentInterval
) =>
  plans.find(
    ({ name, interval }) => name === currentPlan && interval !== currentInterval
  )
