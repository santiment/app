import { mutate } from 'webkit/api'

function DELETE_ENTITY_MUTATION(id, type) {
  let data = 'id'
  let mutation = 'removeWatchlist'

  switch (type) {
    case Something.CHART:
      mutation = 'deleteChartConfiguration'
      break
    case Something.TRIGGER:
      mutation = 'removeTrigger'
      data = 'trigger { id }'
  }

  return `mutation {
    ${mutation}(id:${id}){
      ${data}
    }
  }`
}

export const mutateDeleteEntity = (id, type) => mutate(DELETE_ENTITY_MUTATION(id, type))
