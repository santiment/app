const addressChecker = regexp => address => regexp.test(address)

export const checkIsEthAddress = addressChecker(/^0x[a-fA-F0-9]{40}$/)
export const checkIsBtcAddress = addressChecker(
  /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/
) // NOTE: https://ihateregex.io/expr/bitcoin-address/ [@vanguard | Dec 18, 2020]

export const Infratructure = {
  ETH: 'ETH',
  BTC: 'BTC'
}

export function getAddressInfrastructure (address) {
  if (checkIsEthAddress(address)) {
    return Infratructure.ETH
  }

  if (checkIsBtcAddress(address)) {
    return Infratructure.BTC
  }
}
