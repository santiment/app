export const mapToOptions = input => {
  if (!input) {
    return []
  }

  if (Array.isArray(input)) {
    return input.map(item => ({
      label: item,
      value: item
    }))
  } else {
    if (typeof input === 'object') {
      return [input]
    } else {
      return [
        {
          value: input,
          label: input
        }
      ]
    }
  }
}
