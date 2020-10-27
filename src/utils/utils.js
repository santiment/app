import sanitizeHtml from 'sanitize-html'
import * as qs from 'query-string'
import { loadKeyState } from './localStorage'

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

// NOTE(haritonasty): added additional function after sanitize due to bug with double encoding some symbols in links.
// regexp finds links (<a>) and removes inside tag and in href repetitions
const removeAmpersandRepetitions = str =>
  str.replace(/(?!<a(.*)>(.*))(&amp;)(?=(.*)<\/a>)/gi, '&')

const sanitizeMediumDraftHtml = html =>
  removeAmpersandRepetitions(
    sanitizeHtml(html, {
      allowedTags: [
        ...sanitizeHtml.defaults.allowedTags,
        'figure',
        'figcaption',
        'img',
        'h1',
        'h2',
        'u'
      ],
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'id']
      }
    })
  )

const binarySearchDirection = {
  MOVE_STOP_TO_LEFT: -1,
  MOVE_START_TO_RIGHT: 1
}

const isCurrentDatetimeBeforeTarget = (current, target) =>
  new Date(current.datetime) < new Date(target)

const binarySearchHistoryPriceIndex = (history, targetDatetime) => {
  let start = 0
  let stop = history.length - 1
  let middle = Math.floor((start + stop) / 2)
  while (start < stop) {
    const searchResult = isCurrentDatetimeBeforeTarget(
      history[middle],
      targetDatetime
    )
      ? binarySearchDirection.MOVE_START_TO_RIGHT
      : binarySearchDirection.MOVE_STOP_TO_LEFT

    if (searchResult === binarySearchDirection.MOVE_START_TO_RIGHT) {
      start = middle + 1
    } else {
      stop = middle - 1
    }

    middle = Math.floor((start + stop) / 2)
  }
  // Correcting the result to the first data of post's creation date
  while (
    middle > 0 &&
    !isCurrentDatetimeBeforeTarget(history[middle], targetDatetime)
  ) {
    middle--
  }

  return middle
}

const mergeTimeseriesByKey = ({
  timeseries,
  key: mergeKey = 'datetime',
  mergeData = (longestTSData, timeserieData) =>
    Object.assign({}, longestTSData, timeserieData)
}) => {
  const longestTSMut = timeseries.reduce((acc, val) => {
    return acc.length > val.length ? acc : val
  }, [])

  const longestTS = longestTSMut.slice()
  let longestTSLastIndex = longestTS.length - 1

  for (const timeserie of timeseries) {
    if (timeserie === longestTSMut) {
      continue
    }

    let longestTSRightIndexBoundary = longestTSLastIndex
    let timeserieRightIndex = timeserie.length - 1

    if (timeserieRightIndex < 0) {
      continue
    }

    for (; timeserieRightIndex > -1; timeserieRightIndex--) {
      for (; longestTSRightIndexBoundary > -1; longestTSRightIndexBoundary--) {
        const longestTSData = longestTS[longestTSRightIndexBoundary]
        const timeserieData = timeserie[timeserieRightIndex]

        if (longestTSData[mergeKey] === timeserieData[mergeKey]) {
          longestTS[longestTSRightIndexBoundary] = mergeData(
            longestTSData,
            timeserieData
          )

          longestTSRightIndexBoundary--
          break
        }

        const longestDate = new Date(longestTSData[mergeKey])
        if (longestDate < new Date(timeserieData[mergeKey])) {
          const timeserieFirstUnfoundIndex = timeserieRightIndex

          timeserieRightIndex--

          while (
            timeserieRightIndex > 0 &&
            longestDate < new Date(timeserie[timeserieRightIndex][mergeKey])
          ) {
            timeserieRightIndex--
          }

          if (timeserieRightIndex < 0) {
            break
          }

          longestTS[longestTSRightIndexBoundary] = mergeData(
            longestTSData,
            timeserie[timeserieRightIndex]
          )

          longestTS.splice(
            longestTSRightIndexBoundary + 1,
            0,
            ...timeserie.slice(
              timeserieRightIndex + 1,
              timeserieFirstUnfoundIndex + 1
            )
          )

          longestTSLastIndex = longestTS.length - 1

          timeserieRightIndex--

          if (timeserieRightIndex < 0) {
            break
          }
        }
      }

      if (longestTSRightIndexBoundary === -1) {
        break
      }
    }
  }

  return longestTS
}

const capitalizeStr = (string = '') =>
  string.charAt(0).toUpperCase() + string.slice(1)

const uncapitalizeStr = string =>
  string.charAt(0).toLowerCase() + string.slice(1)

const mapParsedTrueFalseFields = object => {
  if (typeof object === 'object') {
    for (const key in object) {
      const val = object[key]
      if (val === 'true') {
        object[key] = true
      } else if (val === 'false') {
        object[key] = false
      }
    }
  }

  return object
}

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

const isStage = window.location && window.location.href.indexOf('stage') !== -1

// true if Oct 25 - Nov 1 and user didn't toggle night mode
function isShowHalloweenFeatures () {
  const isDisabledByUser = loadKeyState('disabledHalloweenMode')
  const isHalloween = isHalloweenDay()

  return isHalloween && !isDisabledByUser
}

// true if Oct 25 - Nov 1
function isHalloweenDay () {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  return (
    (currentMonth === 9 && currentDay > 24) ||
    (currentMonth === 10 && currentDay < 2)
  )
}

export {
  getOrigin,
  getAPIUrl,
  getConsentUrl,
  sanitizeMediumDraftHtml,
  binarySearchHistoryPriceIndex,
  mapParsedTrueFalseFields,
  mergeTimeseriesByKey,
  capitalizeStr,
  uncapitalizeStr,
  mapQSToState,
  mapStateToQS,
  isEthStrictAddress,
  isEthStrictHashTx,
  calcPercentageChange,
  isNotSafari,
  safeDecode,
  updateHistory,
  isStage,
  isHalloweenDay,
  isShowHalloweenFeatures
}
