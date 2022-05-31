import { mutate } from 'webkit/api'

const HIDE_ENTITY_MUTATION = (id, hideKey) => `
    mutation {
        moderateHide(entityType: ${hideKey}, entityId: ${id})
    }
`

export default (id, hideKey) => mutate(HIDE_ENTITY_MUTATION(id, hideKey))
