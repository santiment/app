import { safeDecode } from "../../utils/utils";

export const TABS = [
  {
    index: 'Assets',
    content: 'Assets',
    getLinkURL: (slug) => `/projects/${slug}`,
    getLinkLabel: (slug) => slug
  },
  {
    index: 'Trends',
    content: 'Trending words',
    getLinkURL: (word) => `/labs/trends/explore/${word}`,
    getLinkLabel: (word) => safeDecode(word)
  },
  {
    index: 'Insights',
    content: 'Insights',
    // FIXME
    getLinkURL: (insight) => `/labs/trends/explore/${insight}`,
    getLinkLabel: (insight) => safeDecode(insight)
  }
]
