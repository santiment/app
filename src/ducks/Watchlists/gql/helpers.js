import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../detector'

const ARR = []

const normalizeAddress = ({
  blockchainAddress: { address, infrastructure, notes }
}) => ({
  blockchainAddress: { address, infrastructure, notes }
})

function normalizeProject (item) {
  if (item.project) {
    return { projectId: +item.project.id }
  } else if (item.projectId) {
    return { projectId: +item.projectId }
  }
}

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
    case BLOCKCHAIN_ADDRESS:
      return BLOCKCHAIN_ADDRESS
    case PROJECT:
    case SCREENER:
    default:
      return PROJECT
  }
}
