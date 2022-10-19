function calcAverage(data) {
  return data.reduce((acc, { value }) => acc + value, 0) / data.length
}

export function getAverageSocialVolume(data) {
  return Math.round(calcAverage(data))
}

export function getAverageSocialDominance(data) {
  return calcAverage(data).toFixed(2)
}
