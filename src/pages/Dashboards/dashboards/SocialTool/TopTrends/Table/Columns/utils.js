export const getAverageSocialVolume = (data) =>
  Math.round(data.reduce((acc, { value }) => acc + value, 0) / data.length)
