import { parse, stringify } from 'query-string'

function sanitize (topics = []) {
  if (typeof topics === 'string') {
    return [topics]
  } else {
    return topics.filter(Boolean)
  }
}

export function getTopicsFromUrl () {
  const data = parse(window.location.search, { arrayFormat: 'comma' })
  return sanitize(data.addedTopics)
}

export function updTopicsInUrl (topics) {
  const data = parse(window.location.search, { arrayFormat: 'comma' })
  const WithNewTopics = { ...data, addedTopics: topics }

  return stringify(WithNewTopics, {
    arrayFormat: 'comma'
  })
}
