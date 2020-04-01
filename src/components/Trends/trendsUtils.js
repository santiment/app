import { push } from 'react-router-redux'

export const gotoExplore = dispatch => ({
  gotoExplore: topic => {
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
