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

export const sourcesMeta = {
  total: {
    index: 'total',
    name: 'Total Mentions',
    color: 'jungle-green',
    value: 0
  },
  telegram: {
    index: 'telegram',
    name: 'Telegram',
    color: 'dodger-blue',
    value: 0
  },
  reddit: {
    index: 'reddit',
    name: 'Reddit',
    color: 'persimmon',
    value: 0
  },
  professional_traders_chat: {
    index: 'professional_traders_chat',
    name: 'Professional Traders Chat',
    color: 'texas-rose',
    value: 0
  },
  discord: {
    index: 'discord',
    name: 'Discord',
    color: 'heliotrope',
    value: 0
  }
}
