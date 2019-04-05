const defaultMoveFn = (target, value) => target < value
const defaultCheckFn = (target, value) => target === value

export const binarySearch = ({
  moveFn = defaultMoveFn,
  checkFn = defaultCheckFn,
  array,
  target
}) => {
  let start = 0
  let stop = array.length - 1
  let middle = Math.floor(stop / 2)
  let value = array[middle]
  let wasFound = false

  while (start < stop) {
    if (checkFn(target, value)) {
      wasFound = true
      break
    }

    if (moveFn(target, value)) {
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
