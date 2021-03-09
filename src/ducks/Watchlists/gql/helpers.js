import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../detector'

const ARR = []

const normalizeAddress = ({
  blockchainAddress: { address, infrastructure, note }
}) => ({
  blockchainAddress: { address, infrastructure, note }
})
const normalizeProject = ({ project: { id } }) => ({ project_id: +id })

export function normalizeItems (items = ARR, type) {
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
    case SCREENER:
      return PROJECT
    case PROJECT:
    case BLOCKCHAIN_ADDRESS:
    default:
      return type
  }
}
