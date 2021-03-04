export const Event = {
  trendPositionHistory: {
    key: 'trendPositionHistory',
    type: 'events',
    label: 'Trending Position',
    category: 'Social',
    dataKey: 'position',
    description:
      'Shows the appearance (and position) of the project on our list of top 10 emerging words on crypto social media on a given date'
  },
  position: {
    label: 'Trending Position',
    formatter: val => {
      switch (val) {
        case 1:
          return `1st`
        case 2:
          return '2nd'
        case 3:
          return '3rd'

        default:
          return `${val}th`
      }
    }
  }
}
