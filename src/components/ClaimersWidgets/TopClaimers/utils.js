let currentLoadings = new Set()
const finishedLoadings = new Set()
const queue = []

export function getLoadingStatus (address) {
  if (!address) {
    return ''
  }

  if (finishedLoadings.has(address)) {
    return 'finished'
  }

  if (currentLoadings.size < 3 && queue.length !== 0) {
    currentLoadings.add(queue.shift())
  }

  if (currentLoadings.has(address)) {
    return 'loading'
  }

  if (!currentLoadings.has(address)) {
    if (!queue.includes(address)) {
      queue.push(address)
    }

    return ''
  }
}

export function finishLoading (address) {
  finishedLoadings.add(address)
  currentLoadings.delete(address)
  currentLoadings.add(queue.shift())
}
