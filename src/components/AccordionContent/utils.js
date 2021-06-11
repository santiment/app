// px / ms
const VELOCITY = 1
const MIN_TIME = 200
export const MAX_TIME = 400
const MIN_EXIT_TIME = 200
const MAX_EXIT_TIME = 300

export const calculateTime = distance => {
  const time = distance / VELOCITY
  if (time < MIN_TIME) {
    return MIN_TIME
  }

  if (time > MAX_TIME) {
    return MAX_TIME
  }

  return time
}

export const calculateExitTime = distance => {
  const time = distance / VELOCITY - 100
  if (time < MIN_EXIT_TIME) {
    return MIN_EXIT_TIME
  }

  if (time > MAX_EXIT_TIME) {
    return MAX_EXIT_TIME
  }

  return time
}
