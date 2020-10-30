export const percentServerValueFormatter = value => value / 100
export const percentValueFormatter = value => value * 100

// for outside percent channel
export const percentValueMirrorFormatter = values => values[1] * 100
export const percentServerValueMirrorFormatter = value => [
  -value / 100,
  value / 100
]
