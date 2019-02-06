export const getBalance = state => {
  return state.user.data.sanBalance > 0 ? state.user.data.sanBalance : 0
}

export const checkHasPremium = state => {
  return state.user.data.sanBalance >= 1000
}

export const checkIsLoggedIn = state => {
  return !!state.user.token
}

export const getUserWallet = state => {
  const { ethAccounts = {} } = state.user.data
  const doesUserHaveEthAccounts = ethAccounts && ethAccounts.length > 0
  const address = doesUserHaveEthAccounts ? ethAccounts[0].address : ''
  return address
}
