import gql from 'graphql-tag';
import { client } from '../../../apollo';
import { WATCHLIST_GENERAL_FRAGMENT } from '../../Watchlists/gql/fragments';
const ARRAY = [];
export const constructAddressWatchlistQuery = (columns = ARRAY) => gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
      tableConfiguration {
        id
        type
        title
        columns
      }
      listItems {
        blockchainAddress {
          address
          infrastructure
          ${columns.map(({
  key,
  scheme
}) => scheme || key)}
        }
      }
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`;

const watchlistAccessor = ({
  data
}) => data.watchlist;

export const getAddressWatchlist = (id, columns, fetchPolicy) => client.query({
  fetchPolicy,
  query: constructAddressWatchlistQuery(columns),
  variables: {
    id
  }
}).then(watchlistAccessor);