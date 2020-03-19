import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { SOCIAL_VOLUME_QUERY } from '../../components/SocialVolumeWidget/socialVolumeGQL'
import { normalizeTopic } from './trendsUtils'
import { getIntervalByTimeRange } from './../../utils/dates.js'

const GetTrends = ({ render, sources = {}, sourcesTotal = {}, ...props }) =>
  render({ sources, sourcesTotal, ...props })

const parseProps = word => ({
  data: {
    loading,
    error,
    telegram = {},
    discord = {},
    reddit = {},
    professional_traders_chat = {}
  },
  ownProps: { isLoading, isError }
}) => ({
  [word === '*' ? 'sourcesTotal' : 'sources']: {
    telegram: telegram.chartData || [],
    discord: discord.chartData || [],
    professional_traders_chat: professional_traders_chat.chartData || [],
    reddit: reddit.chartData || []
  },
  isLoading: isLoading || loading,
  isError: isError || error
})

export default compose(
  graphql(SOCIAL_VOLUME_QUERY, {
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
    props: parseProps()
  }),
  graphql(SOCIAL_VOLUME_QUERY, {
    options: ({ timeRange, interval }) => {
      const { from, to } = getIntervalByTimeRange(timeRange)
      return {
        variables: {
          word: '*',
          interval: interval,
          to: to.toISOString(),
          from: from.toISOString()
        }
      }
    },
    props: parseProps('*')
  })
)(GetTrends)
