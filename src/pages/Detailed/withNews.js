import { graphql } from 'react-apollo'
import { NEWS_QUERY } from '../../components/News/NewsGQL'
import { getTimeIntervalFromToday, DAY } from '../../utils/dates'

export default graphql(NEWS_QUERY, {
  skip: ({ isNewsEnabled }) => !isNewsEnabled,
  options: ({ slug }) => {
    const { from, to } = getTimeIntervalFromToday(-14, DAY)
    return {
      variables: { from, to, tag: slug, size: 6 }
    }
  },
  props: ({ data: { news = [], loading } }) => ({
    news: news.reverse(),
    isLoadingNews: loading
  })
})
