import { mutate } from 'webkit/api';

function getDeleteMutation(id, deleteKey, isModerator) {
  if (isModerator) {
    return `
      mutation {
        remove: moderateDelete(entityType: ${deleteKey}, entityId: ${id})
      }
    `;
  }

  let mutation = 'removeWatchlist';
  let data = 'id';

  switch (deleteKey) {
    case 'TRIGGER':
      mutation = 'removeTrigger';
      data = 'trigger { id }';
      break;

    case 'CHART':
      mutation = 'deleteChartConfiguration';
      break;

    default:
      mutation = 'removeWatchlist';
      data = 'id';
  }

  return `
      mutation {
          remove: ${mutation}(id: ${id}) {
              ${data}
          }
      }
    `;
}

export default ((id, deleteKey, isModerator) => mutate(getDeleteMutation(id, deleteKey, isModerator)));