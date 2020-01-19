export const getInterval = timeRange => {
  switch (timeRange) {
    case '1d':
      return '10m'
    case '1w':
      return '2h'
    case '1m':
      return '8h'
    default:
      return '1d'
  }
}
