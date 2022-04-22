import { mutate } from 'webkit/api'

const DELETE = {
  TRIGGER: (id) => `
        mutation {
            remove: removeTrigger(id: ${id}) {
                trigger {
                    id
                } 
            }
        }
    `,
  WATCHLIST: (id) => `
        mutation {
            remove: removeWatchlist(id: ${id}) {
                id
            }
        }
    `,
  CHART: (id) => (id) =>
    `
        mutation {
            remove: deleteChartConfiguration(id: ${id}) {
                id 
            }
        }
    `,
}

export default (id, deleteKey) => mutate(DELETE[deleteKey](id))
