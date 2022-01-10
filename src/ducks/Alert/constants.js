export const ALERT_TYPES = [
  {
    title: 'Asset',
    settings: {
      type: 'metric_signal',
      metric: '',
      target: { slug: '' },
      channel: [],
      time_window: '',
      operation: {}
    },
    steps: [
      {
        label: 'Select Asset',
        description:
          'You can create an alert for a specific asset. Choose one or a few assets..',
        tips: [
          {
            title: 'Asset Tip',
            description:
              'You can create an alert for a specific asset. Choose one or a few assets. Be aware if you change the asset you metric chosen metric may not work.'
          }
        ]
      },
      {
        label: 'Choose Metric and Conditions',
        description:
          'Depend on which asset you choose, there will be available metrics for it and the opposite...',
        tips: [
          {
            title: 'Metric Tip',
            description:
              'Depending on which asset you choose, there will be available metrics for it and the opposite. The next step is selecting conditions for this metric.'
          },
          {
            title: 'Conditions Tip',
            description:
              'Choose absolute or percentage changes, compared to n days, hours or minutes earlier. Chart bellow will show similar alerts that were fired before.'
          }
        ]
      },
      {
        label: 'Set up Notifications and Privacy',
        description:
          'Choose where you want to receive notifications and the frequency of them..',
        tips: [
          {
            title: 'Notification Tip',
            description:
              'Choose one or few alert action. Make sure you enable notifications first. Add alert to the specific telegram group, by typing a name in the input.'
          },
          {
            title: 'Privacy Tip',
            description:
              'Your alert is private by default. But you can change it anytime. If you want to share your alert you should first change privacy settings and then share.'
          }
        ]
      },
      {
        label: 'Check name and description',
        description:
          'We generate the description automatically, you can change it anytime, as a name and a privacy of the alert',
        tips: [
          {
            title: 'Description Tip',
            description:
              'Name and description are generated automatically, but you can change it any time you want.'
          }
        ]
      }
    ],
    subSteps: [
      {
        label: 'Asset'
      },
      {
        label: 'Metric & Conditions'
      },
      {
        label: 'Notification & Privacy settings'
      },
      {
        label: 'Name & Description'
      }
    ]
  },
  {
    title: 'Watchlist',
    settings: {
      type: 'metric_signal',
      metric: '',
      target: { watchlist_id: '' },
      channel: [],
      time_window: '',
      operation: {}
    },
    steps: [
      {
        label: 'Select Watchlist',
        description: 'You can choose any of your watchlists',
        tips: [
          {
            title: 'Watchlist Tip',
            description:
              'Choose any of your watchlists. If you want to create a new one go to app.santiment.net/watchlists.'
          }
        ]
      },
      {
        label: 'Choose Metric and Conditions',
        description:
          'Depend on which watchlist you choose, there will be available metrics for it and the opposite...',
        tips: [
          {
            title: 'Metric Tip',
            description:
              'Depending on which asset you choose, there will be available metrics for it and the opposite. The next step is selecting conditions for this metric.'
          },
          {
            title: 'Conditions Tip',
            description:
              'Choose absolute or percentage changes, compared to n days, hours or minutes earlier.'
          }
        ]
      },
      {
        label: 'Set up Notifications and Privacy',
        description:
          'Choose where you want to receive notifications and the frequency of them..',
        tips: [
          {
            title: 'Notification Tip',
            description:
              'Choose one or few alert action. Make sure you enable notifications first. Add alert to the specific telegram group, by typing a name in the input.'
          },
          {
            title: 'Privacy Tip',
            description:
              'Your alert is private by default. But you can change it anytime. If you want to share your alert you should first change privacy settings and then share.'
          }
        ]
      },
      {
        label: 'Check name and description',
        description:
          'We generate the description automatically, you can change it anytime, as a name and a privacy of the alert',
        tips: [
          {
            title: 'Description Tip',
            description:
              'Name and description are generated automatically, but you can change it any time you want.'
          }
        ]
      }
    ],
    subSteps: [
      {
        label: 'Watchlist'
      },
      {
        label: 'Metric & Conditions'
      },
      {
        label: 'Notification & Privacy settings'
      },
      {
        label: 'Name & Description'
      }
    ]
  },
  {
    title: 'Screener',
    settings: {
      type: 'screener_signal',
      metric: 'social_volume_total',
      channel: [],
      operation: { selector: { watchlist_id: '' } }
    },
    steps: [
      {
        label: 'Select Screener',
        description: 'You can choose any of your screener'
      },
      {
        label: 'Set up Notifications and Privacy',
        description:
          'Choose where you want to receive notifications and the frequency of them..',
        tips: [
          {
            title: 'Notification Tip',
            description:
              'Choose one or few alert action. Make sure you enable notifications first. Add alert to the specific telegram group, by typing a name in the input.'
          },
          {
            title: 'Privacy Tip',
            description:
              'Your alert is private by default. But you can change it anytime. If you want to share your alert you should first change privacy settings and then share.'
          }
        ]
      },
      {
        label: 'Check name and description',
        description:
          'We generate the desctiption automaticly, you can change it anytime, as a name and a privacy of the alert',
        tips: [
          {
            title: 'Description Tip',
            description:
              'Name and description are generated automatically, but you can change it any time you want.'
          }
        ]
      }
    ],
    subSteps: [
      {
        label: 'Screener'
      },
      {
        label: 'Notification & Privacy settings'
      },
      {
        label: 'Name & Description'
      }
    ]
  },
  {
    title: 'Wallet address',
    settings: {
      type: 'wallet_movement',
      target: { address: '' },
      selector: { infrastructure: '', slug: '' },
      channel: [],
      time_window: '',
      operation: {}
    },
    steps: [
      {
        label: 'Choose Wallet & Conditions',
        description: 'You can choose any wallet'
      },
      {
        label: 'Set up Notifications and Privacy',
        description:
          'Choose where you want to receive notifications and the frequency of them..',
        tips: [
          {
            title: 'Notification Tip',
            description:
              'Choose one or few alert action. Make sure you enable notifications first. Add alert to the specific telegram group, by typing a name in the input.'
          },
          {
            title: 'Privacy Tip',
            description:
              'Your alert is private by default. But you can change it anytime. If you want to share your alert you should first change privacy settings and then share.'
          }
        ]
      },
      {
        label: 'Check name and description',
        description:
          'We generate the description automatically, you can change it anytime, as a name and a privacy of the alert',
        tips: [
          {
            title: 'Description Tip',
            description:
              'Name and description are generated automatically, but you can change it any time you want.'
          }
        ]
      }
    ],
    subSteps: [
      {
        label: 'Wallet & Conditions'
      },
      {
        label: 'Notification & Privacy settings'
      },
      {
        label: 'Name & Description'
      }
    ]
  },
  {
    title: 'Social trends',
    settings: {
      type: 'trending_words',
      channel: [],
      target: { slug: '' },
      operation: { trending_project: true }
    },
    steps: [
      {
        label: 'Choose Social trend',
        description: 'You can choose any social word, asset or watchlist'
      },
      {
        label: 'Set up Notifications and Privacy',
        description:
          'Choose where you want to receive notifications and the frequency of them..',
        tips: [
          {
            title: 'Notification Tip',
            description:
              'Choose one or few alert action. Make sure you enable notifications first. Add alert to the specific telegram group, by typing a name in the input.'
          },
          {
            title: 'Privacy Tip',
            description:
              'Your alert is private by default. But you can change it anytime. If you want to share your alert you should first change privacy settings and then share.'
          }
        ]
      },
      {
        label: 'Check name and description',
        description:
          'We generate the description automatically, you can change it anytime, as a name and a privacy of the alert',
        tips: [
          {
            title: 'Description Tip',
            description:
              'Name and description are generated automatically, but you can change it any time you want.'
          }
        ]
      }
    ],
    subSteps: [
      {
        label: 'Social trend'
      },
      {
        label: 'Notification & Privacy settings'
      },
      {
        label: 'Name & Description'
      }
    ]
  }
]
