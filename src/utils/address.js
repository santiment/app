const addressChecker = regexp => address => regexp.test(address)

export const checkIsEthAddress = addressChecker(/^0x[a-fA-F0-9]{40}$/)
export const checkIsBtcAddress = addressChecker(
  /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/
) // NOTE: https://ihateregex.io/expr/bitcoin-address/ [@vanguard | Dec 18, 2020]

export const Infrastructure = {
  ETH: 'ETH',
  BTC: 'BTC'
}

export function getAddressInfrastructure (address) {
  if (checkIsEthAddress(address)) {
    return Infrastructure.ETH
  }

  if (checkIsBtcAddress(address)) {
    return Infrastructure.BTC
  }
}
