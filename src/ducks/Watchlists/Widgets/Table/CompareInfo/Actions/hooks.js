import gql from 'graphql-tag'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

export const useProjectID = selected => {
    const query = selected.map(s => `${s.ticker}: projectBySlug(slug: "${s.slug}") {id}`).join(",")
    const GET_PROJECT_ID_BY_SLUG = gql`{${query}}`
    const [getProjectIDs, { loading, error, data }] = useLazyQuery(GET_PROJECT_ID_BY_SLUG);

    return {
        getProjectIDs,
        projectIds: (selected.length > 0 && data) ? Object.entries(data).map(s => ({projectId: parseInt(s[1].id)})) : [],
        projectLoading: loading,
        projectError: error
    } 
}

const DELETE_WATCHLIST_ITEMS_QUERY = gql`
mutation removeWatchlistItems($id: Int!, $listItems: [InputListItem]!) {
    removeWatchlistItems(id: $id, listItems: $listItems) {
    	id
    }
}
`;

export const useDeleteWatchlistItems = () => {
    const [removeWatchlistItems, { loading, error }] = useMutation(DELETE_WATCHLIST_ITEMS_QUERY);

    return {
        removeWatchlistItems,
        removeLoading: loading,
        removeError: error
    } 
}

const ADD_WATCHLIST_ITEMS_QUERY = gql`
mutation addWatchlistItems($id: Int!, $listItems: [InputListItem]!) {
    addWatchlistItems(id: $id, listItems: $listItems) {
        id
    }
}
`

export const useAddWatchlistItems = () => {
    const [addWatchlistItems, { loading, error }] = useMutation(ADD_WATCHLIST_ITEMS_QUERY);

    return {
        addWatchlistItems,
        addLoading: loading,
        addError: error
    } 
}