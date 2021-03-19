import { BLOCKCHAIN_ADDRESS } from '../../detector'
import {
  ADD_LIST_ITEMS_MUTATION,
  REMOVE_LIST_ITEMS_MUTATION,
  UPDATE_WATCHLIST_MUTATION
} from './queries'

export function getMutationByAction (action, type = BLOCKCHAIN_ADDRESS) {
  switch (action) {
    case 'ADD_ITEMS':
      return ADD_LIST_ITEMS_MUTATION(type)
    case 'REMOVE_ITEMS':
      return REMOVE_LIST_ITEMS_MUTATION(type)
    case 'UPDATE_ITEMS':
    default:
      return UPDATE_WATCHLIST_MUTATION(type)
  }
}
