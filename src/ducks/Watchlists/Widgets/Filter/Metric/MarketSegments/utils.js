export function filterSegmentsBySearch (value = '', segments) {
  if (!value) {
    return segments
  }

  const chars = value.toLowerCase().split('')
  const passedSegments = []

  segments.forEach(segment => {
    const str = segment.name.toLowerCase()
    const foundChars = chars.filter(char => str.includes(char))
    if (foundChars.length === chars.length) {
      passedSegments.push(segment)
    }
  })

  return passedSegments
}
