import { query } from 'webkit/api'

export const MenuItem = {
  NEW: 'New',
  LIKES: 'Likes',
  MY_CREATIONS: 'My creations',
}

export const EntityType = {
  ALERT: {
    label: 'Alerts',
    icon: 'alert',
    color: 'var(--red)',
  },
  ADDRESSE: {
    label: 'Addresses',
    icon: 'wallet',
    color: 'var(--purple)',
  },
  CHART: {
    label: 'Charts',
    icon: 'chart',
    color: 'var(--green)',
  },
  SCREENER: {
    label: 'Screeners',
    icon: 'screener',
    color: 'var(--blue)',
  },
  WATCHLIST: {
    label: 'Watchlists',
    icon: 'watchlist',
    color: 'var(--orange)',
  },
}

export const RANGES = {
  '12h': '12h',
  '24h': '1d',
  '7d': '7d',
  '30d': '30d',
  'All time': '',
}

export const getItems = ({
  types = 'WATCHLIST, SCREENER, CHART_CONFIGURATION',
  range,
  voted = false,
  currentUserDataOnly = false,
  page = 1,
  pageSize = 20,
} = {}) => {
  const QUERYKEY = `getMost${voted ? 'Voted' : 'Recent'}`
  const CURSOR = range ? `cursor: { type: AFTER, datetime: "utc_now-${range}" }` : ''

  const QUERY = `
    {
      ${QUERYKEY} (
        types: [${types}]
        page: ${page}
        pageSize: ${pageSize}
        ${CURSOR}
        currentUserDataOnly: ${currentUserDataOnly}
      ){
        watchlist{ 
          id
          title: name,
          user {
            avatarUrl
            id
            name
            username
          }
          votes {
            totalVotes
          }
          commentsCount
          listItems {
            project {
              slug
            }
          }    
        }
        screener{ 
          id
          title: name,
          user {
            avatarUrl
            id
            name
            username
          }
          votes {
            totalVotes
          }
          commentsCount
          listItems {
            project {
              slug
            }
          }    
        }
        chartConfiguration{
          id
          title
          user {
            avatarUrl
            id
            name
            username
          }
          votes {
            totalVotes
          }
          commentsCount   
          project {slug}          
        }
      }
    }
  `
  return query(QUERY).then((res) => res[QUERYKEY])
}
