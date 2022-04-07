export function filterValuesBySearch (value = '', values, key) {
  if (!value) {
    return values
  }

  const chars = value.toLowerCase().split('')
  const passedValues = []

  values.forEach((item) => {
    const str = item[key].toLowerCase()
    const foundChars = chars.filter((char) => str.includes(char))
    if (foundChars.length === chars.length) {
      passedValues.push(item)
    }
  })

  return passedValues
}
