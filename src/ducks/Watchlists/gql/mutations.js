import { client } from '../../../apollo'
import { normalizeItems } from './helpers'
import { updateWatchlistOnEdit } from './cache'
import { BLOCKCHAIN_ADDRESS } from '../detector'
import { UPDATE_WATCHLIST_MUTATION } from './list/mutations'

export const updateWatchlistShort = variables =>
  client.mutate({
    mutation: UPDATE_WATCHLIST_MUTATION(BLOCKCHAIN_ADDRESS),
    update: updateWatchlistOnEdit,
    variables: {
      ...variables,
      listItems: normalizeItems(variables.listItems, BLOCKCHAIN_ADDRESS)
    }
  })
