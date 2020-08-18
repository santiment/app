import { getDateFormats, getTimeFormats } from '../../../utils/dates'

export function normalizeTransactionData (
  slug,
  { datetime, trxValue, trxHash, fromAddress, toAddress }
) {
  const targetDate = new Date(datetime)
  const { YYYY, MM, DD } = getDateFormats(targetDate)
  const { HH, mm, ss } = getTimeFormats(targetDate)

  return {
    trxHash,
    trxValue,
    fromAddress: {
      ...fromAddress,
      assets: [slug, 'ethereum']
    },
    toAddress: {
      ...toAddress,
      assets: [slug, 'ethereum']
    },
    datetime: `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`
  }
}
