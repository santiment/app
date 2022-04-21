import { query } from 'webkit/api'
import { EntityKeys } from './const'

const accessor = ({ getExplorerItems: { stats, data } }) => ({
  pages: stats.totalPagesCount,
  items: data,
})

export const queryExplorerItems = ({
  types = [],
  range,
  voted = false,
  currentUserDataOnly = false,
  page = 1,
  pageSize = 20,
  assets = [],
} = {}) => {
  const QUERYKEY = `getMost${voted ? 'Voted' : 'Recent'}`
  const CURSOR = range ? `cursor: { type: AFTER, datetime: "utc_now-${range}" }` : ''
  const FILTER_ASSETS = assets.length > 0 ? `filter: {slugs: ${JSON.stringify(assets)}}` : ''
  const TYPES = new Set(types)

  const projectWatchlist = TYPES.has(EntityKeys.PROJECT_WATCHLIST)
    ? EntityQuery.projectWatchlist
    : ''
  const screener = TYPES.has(EntityKeys.SCREENER) ? EntityQuery.screener : ''
  const chartConfiguration = TYPES.has(EntityKeys.CHART_CONFIGURATION)
    ? EntityQuery.chartConfiguration
    : ''
  const insight = TYPES.has(EntityKeys.INSIGHT) ? EntityQuery.insight : ''
  const addressWatchlist = TYPES.has(EntityKeys.ADDRESS_WATCHLIST)
    ? EntityQuery.addressWatchlist
    : ''
  const userTrigger = TYPES.has(EntityKeys.USER_TRIGGER) ? EntityQuery.userTrigger : ''

  const QUERY = `
      {
        getExplorerItems: ${QUERYKEY} (
          types: [${types.join(', ')}]
          page: ${page}
          pageSize: ${pageSize}
          ${CURSOR}
          ${FILTER_ASSETS}
          currentUserDataOnly: ${currentUserDataOnly}
        ){
          stats {
            totalPagesCount
          }
          data {
            ${projectWatchlist}
            ${screener}
            ${chartConfiguration}
            ${insight}
            ${addressWatchlist}
            ${userTrigger}
          }
        }
      }
    `
  return query(QUERY).then(accessor)
}

export function queryReports() {
  const QUERY = `
  {
    getReports{
      name
      url
    }
  }`
  return query(QUERY).then((res) => res.getReports)
}

export function queryTemplates() {
  const QUERY = `
  {
    getSheetsTemplates {
      description,
      name,
      url
    }
  }`
  return query(QUERY).then((res) => res.getSheetsTemplates)
}

export const EntityQuery = {
  projectWatchlist: `projectWatchlist { 
    id
    title: name,
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
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
  }`,
  screener: `screener { 
    id
    title: name,
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
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
  }`,
  chartConfiguration: `chartConfiguration {
    id
    title
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
    }
    votes {
      totalVotes
    }
    commentsCount   
    project {slug}  
    metricsJson        
  }`,
  insight: `insight {
    id
    title
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
    }
    votes {
      totalVotes
    }
    commentsCount   
  }`,
  addressWatchlist: `addressWatchlist {
    id
    title: name
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
          avatarUrl
          username
        }
      }
    }
    votes {
      totalVotes
    }
    commentsCount
    listItems {
      blockchainAddress {
        labels {
          name
        }
      }
    } 
  }`,
  userTrigger: `userTrigger {
      trigger {
        id
        title
      }
      user {
        avatarUrl
        id
        name
        username
        following {
          count
          users {
            id
            avatarUrl
            username
          }
        }
      }  
      votes {
        totalVotes
      }
  }`,
}
