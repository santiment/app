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

export const mutateStoreUserActivity = (entityType, entityId, interactionType) =>
  mutate(STORE_USER_ACTIVITY_MUTATION(entityType, entityId, interactionType))
