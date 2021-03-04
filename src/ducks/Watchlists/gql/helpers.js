import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../detector'

const normalizeItem = ({
  blockchainAddress: { address, infrastructure, note }
}) => ({
  blockchainAddress: {
    address,
    infrastructure,
    note
  }
})
export const normalizeItems = items => items.map(normalizeItem)

export function transformToServerType (type) {
  switch (type) {
    case SCREENER:
      return PROJECT
    case PROJECT:
    case BLOCKCHAIN_ADDRESS:
    default:
      return type
  }
}
