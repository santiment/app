import { parse } from 'query-string'

export function getDatetimeFromUrl () {
  const data = parse(window.location.search, { arrayFormat: 'comma' })
  return data.datetime
}
