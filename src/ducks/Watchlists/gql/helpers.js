import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../detector'

const ARR = []

const normalizeAddress = ({
  blockchainAddress: { address, infrastructure, notes }
}) => ({
  blockchainAddress: { address, infrastructure, notes }
})
const normalizeProject = ({ project: { id } }) => ({ project_id: +id })

export function normalizeItems (items = ARR, type) {
  console.log(items)
  switch (type) {
    case BLOCKCHAIN_ADDRESS:
      return items.map(normalizeAddress)
    case SCREENER:
      return ARR
    case PROJECT:
    default:
      return items.map(normalizeProject)
  }
}

export function transformToServerType (type) {
  switch (type) {
    case BLOCKCHAIN_ADDRESS:
      return BLOCKCHAIN_ADDRESS
    case PROJECT:
    case SCREENER:
    default:
      return PROJECT
  }
}
