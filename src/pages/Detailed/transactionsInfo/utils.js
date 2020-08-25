import { getDateFormats, getTimeFormats } from '../../../utils/dates'

const ETHEREUM = 'ethereum'

export function normalizeTransactionData (
  slug,
  { datetime, trxValue, trxHash, fromAddress, toAddress }
) {
  const targetDate = new Date(datetime)
  const { YYYY, MM, DD } = getDateFormats(targetDate)
  const { HH, mm, ss } = getTimeFormats(targetDate)

  const listSlugs = slug === ETHEREUM ? [slug] : [slug, ETHEREUM]

  return {
    trxHash,
    trxValue,
    fromAddress: {
      ...fromAddress,
      assets: listSlugs
    },
    toAddress: {
      ...toAddress,
      assets: listSlugs
    },
    datetime: `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`
  }
}
