export const ALERT_TYPES = [{
  title: 'Asset',
  description: 'Create an alert for the specific asset or group of assets',
  iconType: 'assets',
  settings: {
    type: 'metric_signal',
    metric: '',
    target: {
      slug: ''
    },
    channel: [],
    time_window: '',
    operation: {}
  },
  steps: [{
    label: 'Select Asset',
    description: 'You can create an alert for a specific asset. Choose one or multiple assets'
  }, {
    label: 'Choose Metric and Conditions',
    description: 'Depend on which asset you choose, there will be available metrics for it and the opposite...'
  }, {
    label: 'Set up Notifications and Privacy',
    description: 'Choose one or multiple alert methods'
  }, {
    label: 'Check name and description',
    description: 'Name and description are generated automatically, but you can change it at your will'
  }],
  subSteps: [{
    label: 'Asset'
  }, {
    label: 'Metric & Conditions'
  }, {
    label: 'Notification & Privacy settings'
  }, {
    label: 'Name & Description'
  }]
}, {
  title: 'Watchlist',
  description: 'Create an alert for the specific watchlist of yours',
  iconType: 'watchlist',
  settings: {
    type: 'metric_signal',
    metric: '',
    target: {
      watchlist_id: ''
    },
    channel: [],
    time_window: '',
    operation: {}
  },
  steps: [{
    label: 'Select Watchlist',
    description: 'You can choose any of your watchlists'
  }, {
    label: 'Choose Metric and Conditions',
    description: 'Depend on which watchlist you choose, there will be available metrics for it and the opposite...'
  }, {
    label: 'Set up Notifications and Privacy',
    description: 'Choose one or multiple alert methods'
  }, {
    label: 'Check name and description',
    description: 'Name and description are generated automatically, but you can change it at your will'
  }],
  subSteps: [{
    label: 'Watchlist'
  }, {
    label: 'Metric & Conditions'
  }, {
    label: 'Notification & Privacy settings'
  }, {
    label: 'Name & Description'
  }]
}, {
  title: 'Screener',
  description: 'Create an alert for one of your screeners',
  iconType: 'view-option',
  settings: {
    type: 'screener_signal',
    metric: 'social_volume_total',
    channel: [],
    operation: {
      selector: {
        watchlist_id: ''
      }
    }
  },
  steps: [{
    label: 'Select Screener',
    description: 'You can choose any of your screener'
  }, {
    label: 'Set up Notifications and Privacy',
    description: 'Choose one or multiple alert methods'
  }, {
    label: 'Check name and description',
    description: 'Name and description are generated automatically, but you can change it at your will'
  }],
  subSteps: [{
    label: 'Screener'
  }, {
    label: 'Notification & Privacy settings'
  }, {
    label: 'Name & Description'
  }]
}, {
  title: 'Wallet address',
  description: 'Create an alert for the specific asset inside a certain wallet',
  iconType: 'wallet',
  settings: {
    type: 'wallet_movement',
    target: {
      address: ''
    },
    selector: {
      infrastructure: '',
      slug: ''
    },
    channel: [],
    time_window: '1d',
    operation: {}
  },
  steps: [{
    label: 'Choose Wallet & Event',
    description: 'You can choose any wallet'
  }, {
    label: 'Set up Notifications and Privacy',
    description: 'Choose one or multiple alert methods'
  }, {
    label: 'Check name and description',
    description: 'Name and description are generated automatically, but you can change it at your will'
  }],
  subSteps: [{
    label: 'Wallet & Event'
  }, {
    label: 'Notification & Privacy settings'
  }, {
    label: 'Name & Description'
  }]
}, {
  title: 'Social trends',
  description: 'Create an alert for any of the social words, asset or watchlist',
  iconType: 'social',
  settings: {
    type: 'trending_words',
    channel: [],
    target: {
      slug: ''
    },
    operation: {
      trending_project: true
    }
  },
  steps: [{
    label: 'Choose Social trend',
    description: 'You can choose any social word, asset or watchlist'
  }, {
    label: 'Set up Notifications and Privacy',
    description: 'Choose one or multiple alert methods'
  }, {
    label: 'Check name and description',
    description: 'Name and description are generated automatically, but you can change it at your will'
  }],
  subSteps: [{
    label: 'Social trend'
  }, {
    label: 'Notification & Privacy settings'
  }, {
    label: 'Name & Description'
  }]
}];