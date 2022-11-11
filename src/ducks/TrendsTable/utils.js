function calcSum(data) {
  return data.reduce((acc, { value }) => acc + value, 0)
}

function calcAverage(data) {
  return calcSum(data) / data.length
}

export function getAverageSocialVolume(data) {
  return Math.round(calcAverage(data))
}

export function getSocialDominanceSum(data) {
  return calcSum(data)
}
