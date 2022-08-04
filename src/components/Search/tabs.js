import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../ducks/Watchlists/gql/allProjectsGQL'
import { safeDecode } from '../../utils/utils'
import { getSEOLinkFromIdAndTitle } from '../Insight/utils'
import { INSIGHTS_BY_SEARCH_TERM_QUERY } from '../Navbar/Search/InsightsCategory'
import { TRENDING_WORDS_QUERY } from './SearchProjects'

export const TABS = [
  {
    index: 'Assets',
    content: 'Assets',
    getLinkURL: (arg) => {
      const slug = arg.slug || arg
      return `/projects/${slug}`
    },
    getLinkLabel: (arg) => {
      const name = arg.name || arg
      return safeDecode(name)
    },
    icon: 'clock',
    fill: 'var(--casper)',
    bgcolor: 'transparent',
    query: ALL_PROJECTS_FOR_SEARCH_QUERY,
    variables: ({ minVolume }) => ({ minVolume }),
    responseKey: 'allProjects',
  },
  {
    index: 'Trends',
    content: 'Trending words',
    getLinkURL: (arg) => {
      const word = arg.word || arg
      return `/labs/trends/explore/${word}`
    },
    getLinkLabel: (arg) => {
      const word = arg.word || arg
      return safeDecode(word)
    },
    icon: 'fire',
    fill: 'var(--blue)',
    bgcolor: 'var(--blue-light-1)',
    query: TRENDING_WORDS_QUERY,
    variables: ({ from, to }) => ({ from, to }),
    responseKey: 'getTrendingWords',
  },
  {
    index: 'Insights',
    content: 'Insights',
    getLinkURL: ({ id, title }) =>
      `https://insights.santiment.net/read/${getSEOLinkFromIdAndTitle(id, title)}`,
    getLinkLabel: (arg) => {
      const title = arg.title || arg
      return safeDecode(title)
    },
    icon: 'description',
    fill: 'var(--orange)',
    bgcolor: 'var(--orange-light-1)',
    query: INSIGHTS_BY_SEARCH_TERM_QUERY,
    variables: ({ searchTerm }) => ({ searchTerm }),
    responseKey: 'insights',
  },
]
