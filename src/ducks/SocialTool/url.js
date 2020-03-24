import { stringify, parse } from 'query-string'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from './defaults'

export function generateShareLink (settings, options, metrics) {
  const Shareable = { ...settings, ...options }

  return stringify(Shareable, { arrayFormat: 'comma' })
}

export function parseUrl () {
  const data = parse(window.location.search, { arrayFormat: 'comma' })

  return {
    settings: reduceStateKeys(DEFAULT_SETTINGS, data),
    options: reduceStateKeys(DEFAULT_OPTIONS, data)
  }
}
