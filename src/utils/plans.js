export const PLANS = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO'
}

export const formatPrice = (price, name, billing) => {
  if (name === PLANS.FREE) return ['$0']
  if (!price) return ['Custom']

  const devider = 100 * (billing === 'year' ? 12 : 1)

  return [`$${parseInt(price / devider, 10)}`, '/mo']
}

export const sanbaseProductId = '2'
export const neuroProductId = '1'

export const findSanbasePlan = ({ id }) => id === sanbaseProductId

export const noBasicPlan = ({ name }) => name !== PLANS.BASIC

export const getCurrentSanbaseSubscription = user => {
  if (!user) return
  const { subscriptions: subs } = user
  if (!subs) return

  return subs.find(
    ({
      plan: {
        product: { id }
      }
    }) => id === sanbaseProductId
  )
}

export const getAlternativeBillingPlan = (plans, oldPlan) => {
  const { name: oldName, interval: oldInterval = 'month' } = oldPlan
  return plans.find(
    ({ name, interval }) => name === oldName && interval !== oldInterval
  )
}

export const getTrialLabel = trialEnd => (trialEnd ? '(trial)' : '')
