import { mutate } from 'webkit/api'

const FEATURE_MUTATION = (entityType, id, flag) => `
    mutation {
        moderateFeatured(entity_type: ${entityType}, entity_id: ${id}, flag: ${flag})
    }
`

export default (entityType, id, flag = true) => mutate(FEATURE_MUTATION(entityType, id, flag))
