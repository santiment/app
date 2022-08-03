import { ALL_PROJECTS_FOR_SEARCH_QUERY } from "../../ducks/Watchlists/gql/allProjectsGQL";
import { safeDecode } from "../../utils/utils";
import { INSIGHTS_BY_SEARCH_TERM_QUERY } from "../Navbar/Search/InsightsCategory";
import { TRENDING_WORDS_QUERY } from "./SearchProjects";

export const TABS = [
  {
    index: 'Assets',
    content: 'Assets',
    getLinkURL: ({slug}) => `/projects/${slug}`,
    getLinkLabel: ({name}) => safeDecode(name),
    icon: 'clock',
    fill: 'var(--casper)',
    bgcolor: 'transparent',
    query: ALL_PROJECTS_FOR_SEARCH_QUERY,
    variables: ({minVolume}) => ({ minVolume}),
    responseKey: 'allProjects',
  },
  {
    index: 'Trends',
    content: 'Trending words',
    getLinkURL: ({word}) => `/labs/trends/explore/${word}`,
    getLinkLabel: ({word}) => safeDecode(word),
    icon: 'fire',
    fill: 'var(--blue)',
    bgcolor: 'var(--blue-light-1)',
    query: TRENDING_WORDS_QUERY,
    variables: ({from, to}) => ({from, to}),
    responseKey: 'getTrendingWords',
  },
  {
    index: 'Insights',
    content: 'Insights',
    // FIXME
    getLinkURL: ({id}) => `https://insights.santiment.net/read/${id}`,
    getLinkLabel: ({title}) => safeDecode(title),
    icon: 'description',
    fill: 'var(--texas-rose)',
    bgcolor: 'var(--orange-light-1)',
    query: INSIGHTS_BY_SEARCH_TERM_QUERY,
    variables: ({searchTerm}) => ({searchTerm}),
    responseKey: 'insights',
  }
]
