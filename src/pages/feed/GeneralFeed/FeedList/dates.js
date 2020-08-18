import { addDays } from '../../../../utils/dates'

export const TODAY = new Date().toLocaleDateString()
export const YESTERDAY = addDays(new Date(), -1).toLocaleDateString()
