import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

export const useProjectID = selected => {
    const query = selected.map(s => `${s.ticker}: projectBySlug(slug: "${s.slug}") {id}`).join(",")
    const GET_PROJECT_ID_BY_SLUG = gql`{${query}}`
    const { data } = useQuery(GET_PROJECT_ID_BY_SLUG);

    return {
        projectIds: (selected.length > 0 && data) ? Object.entries(data).map(s => ({projectId: parseInt(s[1].id)})) : [],
    } 
}

const DELETE_WATCHLIST_ITEMS_QUERY = gql`
mutation removeWatchlistItems($id: Int!, $listItems: [InputListItem]!) {
    removeWatchlistItems(id: $id, listItems: $listItems) {
    	id
    }
}`;

export const useDeleteWatchlistItems = () => {
    const [removeWatchlistItems] = useMutation(DELETE_WATCHLIST_ITEMS_QUERY);

    return {
        removeWatchlistItems,
    } 
}

const ADD_WATCHLIST_ITEMS_QUERY = gql`
mutation addWatchlistItems($id: Int!, $listItems: [InputListItem]!) {
    addWatchlistItems(id: $id, listItems: $listItems) {
        id
    }
}`;

export const useAddWatchlistItems = () => {
    const [addWatchlistItems] = useMutation(ADD_WATCHLIST_ITEMS_QUERY);

    return {
        addWatchlistItems,
    } 
}