import { getTimeIntervalFromToday, DAY, MONTH } from '../../utils/dates'

export function createOptions (hours = 48) {
  const NEXT_DAY = new Date()
  NEXT_DAY.setHours(hours, 0, 0, 0)
  return { isUTC: true, from: NEXT_DAY }
}

const { from: ANON_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -3,
  MONTH,
  createOptions(72)
)
const { from: ANON_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -1,
  DAY,
  createOptions(24)
)

const { from: FREE_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -24,
  MONTH,
  createOptions()
)
const { from: FREE_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -1,
  MONTH,
  createOptions()
)

const { from: BASIC_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -24,
  MONTH,
  createOptions()
)
const { from: BASIC_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -7,
  DAY,
  createOptions()
)

const { from: PRO_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -60,
  MONTH,
  createOptions()
)
const PRO_RIGHT_BOUNDARY_DATE = false

const ENTERPRISE_LEFT_BOUNDARY_DATE = false
const ENTERPRISE_RIGHT_BOUNDARY_DATE = false

export default {
  ANON: {
    leftBoundaryDate: ANON_LEFT_BOUNDARY_DATE,
    rightBoundaryDate: ANON_RIGHT_BOUNDARY_DATE
  },
  FREE: {
    leftBoundaryDate: FREE_LEFT_BOUNDARY_DATE,
    rightBoundaryDate: FREE_RIGHT_BOUNDARY_DATE
  },
  BASIC: {
    leftBoundaryDate: BASIC_LEFT_BOUNDARY_DATE,
    rightBoundaryDate: BASIC_RIGHT_BOUNDARY_DATE
  },
  PRO: {
    leftBoundaryDate: PRO_LEFT_BOUNDARY_DATE,
    rightBoundaryDate: PRO_RIGHT_BOUNDARY_DATE
  },
  ENTERPRISE: {
    leftBoundaryDate: ENTERPRISE_LEFT_BOUNDARY_DATE,
    rightBoundaryDate: ENTERPRISE_RIGHT_BOUNDARY_DATE
  }
}
