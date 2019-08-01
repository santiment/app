import { getTimeIntervalFromToday, DAY, MONTH } from '../../utils/dates'

const { from: FREE_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(-24, MONTH)
const { from: FREE_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(-1, MONTH)

const { from: BASIC_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(-24, MONTH)
const { from: BASIC_RIGHT_BOUNDARY_DATE } = getTimeIntervalFromToday(-7, DAY)

const { from: PRO_LEFT_BOUNDARY_DATE } = getTimeIntervalFromToday(-36, MONTH)
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
