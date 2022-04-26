import { mutate } from 'webkit/api'

function getDeleteMutation(id, deleteKey) {
  let mutation = 'removeWatchlist'
  let data = 'id'

  switch (deleteKey) {
    case 'TRIGGER':
      mutation = 'removeTrigger'
      data = 'trigger { id }'
      break
    case 'CHART':
      mutation = 'deleteChartConfiguration'
      break
    default:
      mutation = 'removeWatchlist'
      data = 'id'
  }

  return `
        mutation {
            remove: ${mutation}(id: ${id}) {
                ${data}
            }
        }
    `
}

export default (id, deleteKey) => mutate(getDeleteMutation(id, deleteKey))
