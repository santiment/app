export const ALERT_TYPES = [
  {
    title: 'Asset',
    mainSteps: [
      {
        label: 'Select Asset',
        description:
          'You can create an alert for a specific asset. Choose one or a few assets..'
      },
      {
        label: 'Choose Metric and Conditions',
        description:
          'Depend on which asset you choose, there will be available metrics for it and the opposite...'
      },
      {
        label: 'Set up Notifications and Privacy',
        description:
          'Choose where you want to receive notifications and the frequency of them..'
      },
      {
        label: 'Check name and description',
        description:
          'We generate the desctiption automaticly, you can change it anytime, as a name and a privacy of the alert'
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
    mainSteps: [],
    subSteps: []
  }
]
