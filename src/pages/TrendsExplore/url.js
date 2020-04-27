import { parse, stringify } from 'query-string'

function sanitize (array = []) {
  return array.filter(Boolean)
}

export function getTopicsFromUrl () {
  const data = parse(window.location.search, { arrayFormat: 'comma' })
  return sanitize(data.addedTopics)

}

export function updTopicsInUrl (topics) {
  const data = parse(window.location.search, { arrayFormat: 'comma' })
  const WithNewTopics = {...data, addedTopics: topics}

  return stringify(WithNewTopics, {
    arrayFormat: 'comma'
  })
}
