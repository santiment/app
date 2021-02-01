import gql from 'graphql-tag'
import { store } from '../../../../../../redux'
import { TABLE_CONFIGS_QUERY } from './queries'
import { useMutation } from '@apollo/react-hooks'
import { notifyCreation, notifyDelete, notifyError } from './notifications'

export const DELETE_TABLE_CONFIG_MUTATION = gql`
  mutation deleteTableConfiguration($id: ID!) {
    config: deleteTableConfiguration(id: $id) {
      id
    }
  }
`

export const CREATE_TABLE_CONFIG_MUTATION = gql`
  mutation createTableConfiguration($title: String!, $columns: json) {
    config: createTableConfiguration(
      settings: { title: $title, isPublic: false, columns: $columns }
    ) {
      id
      title
      columns
      user {
        id
      }
    }
  }
`

// export const UPDATE_TABLE_CONFIG_MUTATION = gql`
//   mutation createTableConfiguration($id: Int, $title: String!, $columns: json) {
//     createTableConfiguration(
//       id: $id
//       settings: { title: $title, isPublic: false, columns: $columns }
//     ) {
//       ...tableConfig
//     }
//   }
//   ${TABLE_CONFIG_FRAGMENT}
// `

export const UPDATE_WATCHLIST_TABLE_CONFIG_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $tableConfigurationId: Int) {
    updateWatchlist(id: $id, tableConfigurationId: $tableConfigurationId) {
      id
    }
  }
`

function buildConfigsCacheUpdater (reducer) {
  return (cache, { data }) => {
    const variables = { userId: +store.getState().user.data.id }

    const { tableConfigurations } = cache.readQuery({
      variables,
      query: TABLE_CONFIGS_QUERY
    })

    cache.writeQuery({
      variables,
      query: TABLE_CONFIGS_QUERY,
      data: { tableConfigurations: reducer(data, tableConfigurations) }
    })
  }
}

const updateConfigsOnCreation = buildConfigsCacheUpdater(
  ({ config: { columns, ...item } }, configs) => [item].concat(configs)
)

const updateConfigsOnDelete = buildConfigsCacheUpdater(
  ({ config: { id: deletedId } }, configs) =>
    configs.filter(({ id }) => id !== deletedId)
)

export function useCreateTableConfig () {
  const [mutate, data] = useMutation(CREATE_TABLE_CONFIG_MUTATION, {
    update: updateConfigsOnCreation
  })

  function createTableConfig ({ title, columns }) {
    return mutate({
      variables: {
        title,
        columns: JSON.stringify(columns)
      }
    })
      .then(({ data: { config } }) => {
        notifyCreation(config.title)
        return config
      })
      .catch(() => notifyError('Error during the creation set process'))
  }

  return { createTableConfig, data }
}

export function useDeleteTableConfig () {
  const [mutate, { loading }] = useMutation(DELETE_TABLE_CONFIG_MUTATION, {
    update: updateConfigsOnDelete
  })

  function deleteTableConfig ({ title, id }) {
    return mutate({
      variables: {
        id: +id
      }
    })
      .then(() => notifyDelete(title))
      .catch(() => notifyError('Error during the deleting set process'))
  }

  return { deleteTableConfig, loading }
}
