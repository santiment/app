import { mutate } from 'san-webkit/lib/api';

function EDIT_ENTITY_MUTATION(id, editKey, title, description, isPublic) {
  let mutation = 'updateWatchlist';
  let data = 'id';
  let args = `(id: ${id}, name: "${title}", description: "${description}", isPublic: ${isPublic})`;

  switch (editKey) {
    case 'TRIGGER':
      mutation = 'updateTrigger';
      args = `(id: ${id}, title: "${title}", description: "${description}", isPublic: ${isPublic})`;
      data = 'trigger { id }';
      break;

    case 'CHART':
      mutation = 'updateChartConfiguration';
      args = `(id: ${id}, settings: {title: "${title}", description: "${description}", isPublic: ${isPublic}})`;
      break;

    default:
  }

  return `
        mutation {
            ${mutation} ${args} {
                ${data}
            }
        }
    `;
}

export default ((id, editKey, title, description, isPublic) => mutate(EDIT_ENTITY_MUTATION(id, editKey, title, description, isPublic)));