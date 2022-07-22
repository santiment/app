import { mutate } from 'webkit/api'
import { EntityType } from '../pages/Explorer/const'

export const InteractionType = {
  VIEW: 'VIEW',
  COMMENT: 'COMMENT',
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
}

function STORE_USER_ACTIVITY_MUTATION(entityType, entityId, interactionType) {
  let normalizedEntityType = entityType

  if (EntityType[entityType]) {
    normalizedEntityType = EntityType[entityType].key
  }

  return `
      mutation {
          storeUserEntityInteraction(
              entityType: ${normalizedEntityType}
              entityId: ${entityId}
              interactionType: ${interactionType}
          )
      } 
    `
}

export const EntityTypes = {}
Object.keys(EntityType).forEach((type) => (EntityTypes[type] = type))

// Kepp track of latest user activity based on interaction type
const userActivityHistory = {}

const saveLatestUserActivity = (entityType, entityId, interactionType) => {
  if (!userActivityHistory[interactionType]) {
    userActivityHistory[interactionType] = {
      entityType,
      entityId,
      timestamp: (new Date()).getTime()
    }
  }
}

function getLatestUserActivityDuration(entityType, entityId, interactionType) {
  const latestActivity = userActivityHistory[interactionType]
  if (latestActivity.entityType === entityType && latestActivity.entityId === entityId) {
    return ((new Date()).getTime() - latestActivity.timestamp) / 1000
  }
}

export function mutateStoreUserActivity(entityType, entityId, interactionType) {
  saveLatestUserActivity(entityType, entityId, interactionType)
  const duration = +getLatestUserActivityDuration(entityType, entityId, interactionType)
  // Prevent duplicate/quick same user acitivity
  if (duration < MIN_ACTIVITY_COOLDOWN) return
  return mutate(STORE_USER_ACTIVITY_MUTATION(entityType, entityId, interactionType))
}
