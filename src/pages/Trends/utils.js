const defaultMoveFn = (target, item) => target < item
const defaultCheckFn = (target, item) => target === item

export const binarySearch = ({
  moveFn = defaultMoveFn,
  checkFn = defaultCheckFn,
  array,
  target
}) => {
  let start = 0
  let stop = array.length - 1
  let middle = Math.floor(stop / 2)
  let item = array[middle]

  while (start < stop) {
    if (checkFn(target, item)) {
      break
    }

    if (moveFn(target, item)) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    middle = Math.floor((start + stop) / 2)
    item = array[middle]
  }

  return {
    item: checkFn(target, item) ? item : undefined,
    index: middle
  }
}
