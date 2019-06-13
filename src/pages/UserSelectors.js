export const getBalance = state => {
  return state.user.data.sanBalance > 0 ? state.user.data.sanBalance : 0
}

export const checkHasPremium = state => {
  return state.user.data.sanBalance >= 1000
}

export const checkIsLoggedIn = state => {
  return !!state.user.data.id
}

export const selectIsTelegramConnected = state => {
  if (!state.user.data) {
    return false
  }
  if (!state.user.data.settings) {
    return false
  }
  return (
    state.user.data.settings.hasTelegramConnected &&
    state.user.data.settings.signalNotifyTelegram
  )
}

export const getUserWallet = state => {
  const { ethAccounts = {} } = state.user.data
  const doesUserHaveEthAccounts = ethAccounts && ethAccounts.length > 0
  const address = doesUserHaveEthAccounts ? ethAccounts[0].address : ''
  return address
}
