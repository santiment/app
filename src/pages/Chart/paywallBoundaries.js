import { getTimeIntervalFromToday, DAY, MONTH } from '../../utils/dates'

const options = { isUTC: true }

const { from: FREE_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -24,
  MONTH,
  options
)
const { from: FREE_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -1,
  MONTH,
  options
)

const { from: BASIC_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -24,
  MONTH,
  options
)
const { from: BASIC_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -7,
  DAY,
  options
)

const { from: PRO_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(
  -60,
  MONTH,
  options
)
const PRO_RIGHT_BOUNDARY_DATE = false

const ENTERPRISE_LEFT_BOUNDARY_DATE = false
const ENTERPRISE_RIGHT_BOUNDARY_DATE = false

export default {
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
