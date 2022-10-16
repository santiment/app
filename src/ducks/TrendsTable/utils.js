export const getAverageSocialVolume = (data) =>
  Math.round(data.reduce((acc, { value }) => acc + value, 0) / data.length)

export const getAverageSocialDominance = (data) =>
  (data.reduce((acc, { value }) => acc + value, 0) / data.length).toFixed(2)
