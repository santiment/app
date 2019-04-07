const defaultMoveClb = (target, value) => target < value
const defaultCheckClb = (target, value) => target === value

export const binarySearch = ({
  moveClb = defaultMoveClb,
  checkClb = defaultCheckClb,
  array,
  target
}) => {
  let start = 0
  let stop = array.length - 1
  let middle = Math.floor(stop / 2)
  let value = array[middle]
  let wasFound = false

  while (start < stop) {
    if (checkClb(target, value)) {
      wasFound = true
      break
    }

    if (moveClb(target, value)) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    middle = Math.floor((start + stop) / 2)
    value = array[middle]
  }

  return {
    value: wasFound ? value : undefined,
    index: middle
  }
}
