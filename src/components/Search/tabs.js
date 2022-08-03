import { safeDecode } from "../../utils/utils";

export const TABS = [
  {
    index: 'Assets',
    content: 'Assets',
    getLinkURL: (slug) => `/projects/${slug}`,
    getLinkLabel: (slug) => slug,
    icon: 'clock',
    fill: 'var(--casper)',
    bgcolor: 'transparent',
  },
  {
    index: 'Trends',
    content: 'Trending words',
    getLinkURL: (word) => `/labs/trends/explore/${word}`,
    getLinkLabel: (word) => safeDecode(word),
    icon: 'fire',
    fill: 'var(--blue)',
    bgcolor: 'var(--blue-light-1)',
  },
  {
    index: 'Insights',
    content: 'Insights',
    // FIXME
    getLinkURL: (insight) => `/labs/trends/explore/${insight}`,
    getLinkLabel: (insight) => safeDecode(insight),
    icon: 'description',
    fill: 'var(--orange-pale)',
    bgcolor: 'var(--orange-light-1)',
  }
]
