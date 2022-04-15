export const MenuItem = {
  NEW: 'New',
  LIKES: 'Likes',
  MY_CREATIONS: 'My creations',
}

export const EntityType = {
  ALERT: {
    key: 'USER_TRIGGER',
    label: 'Alerts',
    icon: 'alert',
    color: 'var(--red)',
  },
  ADDRESS: {
    key: 'ADDRESS_WATCHLIST',
    label: 'Addresses',
    icon: 'wallet',
    color: 'var(--purple)',
  },
  CHART: {
    key: 'CHART_CONFIGURATION',
    label: 'Charts',
    icon: 'chart',
    color: 'var(--green)',
  },
  SCREENER: {
    key: 'SCREENER',
    label: 'Screeners',
    icon: 'screener',
    color: 'var(--blue)',
  },
  WATCHLIST: {
    key: 'PROJECT_WATCHLIST',
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
      project {
        slug
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
