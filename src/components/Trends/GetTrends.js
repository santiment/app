import { graphql } from 'react-apollo'
import { SOCIAL_VOLUME_QUERY } from '../../components/SocialVolumeWidget/socialVolumeGQL'
import { getIntervalByTimeRange } from './../../utils/dates.js'

const GetTrends = ({ render, sources = {}, ...props }) =>
  render({ sources, ...props })

export const normalizeTopic = topic => {
  const pattern = /AND|OR/
  if (topic.split(' ').length > 1 && !pattern.test(topic)) {
    return `"${topic}"`
  }
  return topic
}

export default graphql(SOCIAL_VOLUME_QUERY, {
  options: ({ topic, timeRange, interval }) => {
    const { from, to } = getIntervalByTimeRange(timeRange)
    return {
      variables: {
        word: normalizeTopic(topic),
        interval: interval,
        to: to.toISOString(),
        from: from.toISOString()
      }
    }
  },
  props: ({
    data: {
      loading,
      error,
      telegram = {},
      discord = {},
      reddit = {},
      professional_traders_chat = {}
    }
  }) => {
    return {
      sources: {
        telegram: telegram.chartData || [],
        discord: discord.chartData || [],
        professional_traders_chat: professional_traders_chat.chartData || [],
        reddit: reddit.chartData || []
      },
      isLoading: loading,
      isError: error
    }
  }
})(GetTrends)
