let currentLoading = ''
const finishedLoadings = new Set()
const queue = []

export function getLoadingStatus(address) {

	if (!address) {
		return ''
	}


  if (finishedLoadings.has(address)) {
    return 'finished'
  }

	if (!currentLoading && queue.length !== 0) {
		currentLoading = queue.shift()
	}

	if (currentLoading === address) {
    currentLoading = address
    return 'loading'
  }

	if (currentLoading !== address) {
		if (!queue.includes(address)) {
			queue.push(address)
		}

    return ''
  }
}

export function finishLoading(address) {
  finishedLoadings.add(address)
	currentLoading = queue.shift()
}
