import { getTimeIntervalFromToday, DAY, MONTH } from '../../utils/dates'

const ONE_DAY_IN_HOURS = 24
const TWO_DAYS_IN_HOURS = ONE_DAY_IN_HOURS * 2
const THREE_DAYS_IN_HOURS = ONE_DAY_IN_HOURS * 3

function correctFromByHours (hours = TWO_DAYS_IN_HOURS) {
  const NEXT_DAY = new Date()
  NEXT_DAY.setHours(hours, 0, 0, 0)
  return { isUTC: true, from: NEXT_DAY }
}

const { from: ANON_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -3,
  MONTH,
  correctFromByHours(THREE_DAYS_IN_HOURS)
)
const { from: ANON_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -1,
  DAY,
  correctFromByHours(ONE_DAY_IN_HOURS)
)

const { from: FREE_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -24,
  MONTH,
  correctFromByHours()
)
const { from: FREE_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -1,
  MONTH,
  correctFromByHours()
)

const { from: BASIC_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -24,
  MONTH,
  correctFromByHours()
)
const { from: BASIC_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -7,
  DAY,
  correctFromByHours()
)

const { from: PRO_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -60,
  MONTH,
  correctFromByHours()
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
