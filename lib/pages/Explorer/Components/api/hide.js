import { mutate } from 'webkit/api';

const HIDE_ENTITY_MUTATION = (id, entityType) => `
    mutation {
        moderateHide(entityType: ${entityType}, entityId: ${id})
    }
`;

export default ((id, entityType) => mutate(HIDE_ENTITY_MUTATION(id, entityType)));