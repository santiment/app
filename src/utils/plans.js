export const PLANS = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO'
}

export const formatOnlyPrice = amount => `$${parseInt(amount / 100, 10)}`

export const formatPrice = (price, name, billing) => {
  if (name === PLANS.FREE) return ['$0']
  if (!price) return ['Custom']

  const devider = 100 * (billing === 'year' ? 12 : 1)

  return [`$${parseInt(price / devider, 10)}`, '/mo']
}

const YEAR_MULT_DIV = [1, 12]
const MONTH_MULT_DIV = [12, 1]
export const getYearMonthPrices = (amount, billing) => {
  const [mult, div] = billing === 'year' ? YEAR_MULT_DIV : MONTH_MULT_DIV
  return [formatOnlyPrice(amount * mult), formatOnlyPrice(amount / div)]
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
  const { name, interval: oldInterval = 'month' } = oldPlan
  const oldName = name.toUpperCase()
  return plans
    .filter(({ isDeprecated }) => !isDeprecated)
    .find(
      ({ name, interval }) =>
        name.toUpperCase() === oldName && interval !== oldInterval
    )
}

export const getTrialLabel = trialEnd => (trialEnd ? '(trial)' : '')
