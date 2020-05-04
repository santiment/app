import { push } from 'react-router-redux'
import Raven from 'raven-js'
import GA from './../../../utils/tracking'

export const gotoExplore = dispatch => ({
  gotoExplore: topic => {
    trackTopicSearch(topic)
    dispatch(push(`/labs/trends/explore/${encodeURIComponent(topic)}`))
  }
})

export const normalizeTopic = topic => {
  const pattern = /AND|OR/
  if (topic.split(' ').length > 1 && !pattern.test(topic)) {
    return `"${topic}"`
  }
  return topic
}

export const trackTopicSearch = topic => {
  if (process.env.NODE_ENV === 'production') {
    fetch(
      'https://us-central1-sanbase-search-ea4dc.cloudfunctions.net/trackTrends',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      }
    ).catch(error =>
      Raven.captureException(
        'tracking search trends queries ' + JSON.stringify(error)
      )
    )
    GA.event({
      category: 'Trends Search',
      action: 'Search: ' + topic
    })
  }
}
