import { query } from 'webkit/api'

export const getItems = ({
  types = [],
  range,
  voted = false,
  currentUserDataOnly = false,
  page = 1,
  pageSize = 20,
} = {}) => {
  const QUERYKEY = `getMost${voted ? 'Voted' : 'Recent'}`
  const CURSOR = range ? `cursor: { type: AFTER, datetime: "utc_now-${range}" }` : ''

  const projectWatchlist = types.includes('PROJECT_WATCHLIST')
    ? `projectWatchlist{ 
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
    }`
    : ''

  const screener = types.includes('SCREENER')
    ? `screener{ 
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
    }`
    : ''

  const chartConfiguration = types.includes('CHART_CONFIGURATION')
    ? `chartConfiguration{
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
      metricsJson        
    }`
    : ''

  const insight = types.includes('INSIGHT')
    ? `insight {
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
    }`
    : ''

  const addressWatchlist = types.includes('ADDRESS_WATCHLIST')
    ? `addressWatchlist {
      id
      title: name
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
    }`
    : ''

  const userTrigger = types.includes('USER_TRIGGER')
    ? `userTrigger {
      trigger {
        id
        title
      }
      userId
      votes {
        totalVotes
      }
   }`
    : ''

  const QUERY = `
      {
        ${QUERYKEY} (
          types: [${types.join(', ')}]
          page: ${page}
          pageSize: ${pageSize}
          ${CURSOR}
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
  return query(QUERY).then((res) => ({
    pages: res[QUERYKEY].stats.totalPagesCount,
    items: res[QUERYKEY].data,
  }))
}

export const getCurrentUser = () => {
  const QUERY = `
    {
        currentUser {
            id
            username
            name
            avatarUrl
        }
    }
    `
  return query(QUERY).then((res) => res.currentUser)
}
