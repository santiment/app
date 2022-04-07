import { getCurrentSanbaseSubscription, PLANS } from '../utils/plans'

export const getBalance = (state) => {
  return state.user.data.sanBalance > 0 ? state.user.data.sanBalance : 0
}

export const checkHasPremium = (state) => {
  if (state.user.isLoading) {
    return
  }

  if (!state.user.data.subscriptions || state.user.data.subscriptions.length === 0) {
    return false
  }

  const { plan } = getCurrentSanbaseSubscription(state.user.data) || {}

  return plan && plan.name === PLANS.PRO
}

export const checkIsLoggedIn = (state) => {
  return state.user.data && !!state.user.data.id
}

export const checkIsLoggedInPending = (state) => {
  return state.user.isLoading
}

export const getUserWallet = (state) => {
  const { ethAccounts = {} } = state.user.data
  const doesUserHaveEthAccounts = ethAccounts && ethAccounts.length > 0
  const address = doesUserHaveEthAccounts ? ethAccounts[0].address : ''
  return address
}
