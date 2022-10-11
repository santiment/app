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
  favorites = false,
  currentUserDataOnly = false,
  page = 1,
  pageSize = 20,
  assets = [],
  userRoleDataOnly = false,
  isFeaturedDataOnly = false,
} = {}) => {
  let QUERYKEY = `getMost`
  if (voted) QUERYKEY = QUERYKEY.concat('Voted')
  else if (favorites) QUERYKEY = QUERYKEY.concat('Used')
  else QUERYKEY = QUERYKEY.concat('Recent')

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
          ${voted ? `currentUserVotedForOnly: true` : ''}
          ${!voted && !favorites ? `currentUserDataOnly: ${currentUserDataOnly}` : ''}
          ${isFeaturedDataOnly ? 'isFeaturedDataOnly: true' : ''}
          ${userRoleDataOnly ? 'userRoleDataOnly: SAN_FAMILY' : ''}
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
    title: name
    description
    isPublic
    isFeatured
    insertedAt
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
        }
      }
      followers {
        count
      }
    }
    votes {
      totalVotes
      currentUserVotes
    }
    commentsCount
    views
  }`,
  screener: `screener {
    id
    title: name
    description
    isPublic
    isFeatured
    insertedAt
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
        }
      }
      followers {
        count
      }
    }
    votes {
      totalVotes
      currentUserVotes
    }
    commentsCount
    views
  }`,
  chartConfiguration: `chartConfiguration {
    id
    title
    description
    isPublic
    isFeatured
    insertedAt
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
        }
      }
      followers {
        count
      }
    }
    votes {
      totalVotes
      currentUserVotes
    }
    commentsCount
    project {slug}
    metricsJson
    views
  }`,
  insight: `insight {
    id
    title
    isFeatured
    publishedAt
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
        }
      }
      followers {
        count
      }
    }
    votes {
      totalVotes
      currentUserVotes
    }
    commentsCount
    pulseText
    isPulse
    project: priceChartProject {
      id
      slug
      ticker
      priceUsd
    }
    views
  }`,
  addressWatchlist: `addressWatchlist {
    id
    title: name
    description
    isPublic
    isFeatured
    insertedAt
    user {
      avatarUrl
      id
      name
      username
      following {
        count
        users {
          id
        }
      }
      followers {
        count
      }
    }
    votes {
      totalVotes
      currentUserVotes
    }
    commentsCount
    listItems {
      blockchainAddress {
        labels {
          name
        }
      }
    }
    views
  }`,
  userTrigger: `userTrigger {
      trigger {
        id
        title
        description
        isPublic
        isFeatured
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
          }
        }
        followers {
          count
        }
      }
      votes {
        totalVotes
        currentUserVotes
      }
      views
  }`,
}
