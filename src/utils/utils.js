import * as qs from 'query-string'

const getOrigin = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_FRONTEND_URL || window.location.origin
  }
  return (
    (window.env || {}).FRONTEND_URL ||
    process.env.REACT_APP_FRONTEND_URL ||
    window.location.origin
  )
}

const getAPIUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_BACKEND_URL || window.location.origin
  }
  return (
    (window.env || {}).BACKEND_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    window.location.origin
  ).replace('app', 'api')
}

const getConsentUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_BACKEND_URL || window.location.origin
  }
  return (
    (window.env || {}).LOGIN_URL ||
    (window.env || {}).BACKEND_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    window.location.origin
  )
}

const capitalizeStr = (string = '') =>
  string.charAt(0).toUpperCase() + string.slice(1)

const mapQSToState = ({ location }) =>
  location
    ? qs.parse(location.search.replace(/\?/g, '&'), {
      arrayFormat: 'bracket'
    })
    : {}

const mapStateToQS = state =>
  '?' +
  qs.stringify(state, {
    arrayFormat: 'bracket'
  })

/**
 * Checks if the given string is an ethereum address
 *
 * @method isEthStrictAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
const isEthStrictAddress = address => /^(0x)?[0-9a-fA-F]{40}$/.test(address)

const isEthStrictHashTx = tx => /^0x([A-Fa-f0-9]{64})$/.test(tx)

export const mapToTxLink = value =>
  isEthStrictHashTx(value)
    ? `https://etherscan.io/tx/${value}`
    : `https://www.blockchain.com/btc/tx/${value}`

export const mapToTxAddress = address =>
  isEthStrictAddress(address)
    ? `https://etherscan.io/address/${address}`
    : `https://www.blockchain.com/btc/address/${address}`

/**
 * Function to calculate the percentage change between two numbers.
 * @param {number} originalValue Original number
 * @param {number} newValue New number
 *
 * @example
 * // Calc percentage change for originalValue: 12 & newValue: 10
 * calcPercentageChange(12, 10)
 * //=> -17.67
 */
const calcPercentageChange = (originalValue, newValue) => {
  if (originalValue === 0) return 0
  return (((newValue - originalValue) / originalValue) * 100).toFixed(2)
}

const isNotSafari = () =>
  !/^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)

const safeDecode = pathname => {
  if (!pathname) return ''

  try {
    return decodeURIComponent(pathname)
  } catch (err) {
    return pathname
  }
}

const updateHistory = url => {
  const { history } = window
  history.replaceState(history.state, null, url)
}

const isStage =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BACKEND_URL === undefined ||
      process.env.REACT_APP_BACKEND_URL === 'https://api-stage.santiment.net'
    : window.location && window.location.href.indexOf('stage') !== -1

export {
  getOrigin,
  getAPIUrl,
  getConsentUrl,
  capitalizeStr,
  mapQSToState,
  mapStateToQS,
  isEthStrictAddress,
  isEthStrictHashTx,
  calcPercentageChange,
  isNotSafari,
  safeDecode,
  updateHistory,
  isStage
}
