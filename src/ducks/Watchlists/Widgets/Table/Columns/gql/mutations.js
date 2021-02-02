import gql from 'graphql-tag'
import { store } from '../../../../../../redux'
import { TABLE_CONFIGS_QUERY } from './queries'
import { useMutation } from '@apollo/react-hooks'
import {
  notifyCreation,
  notifyDelete,
  notifyError,
  notifyUpdate
} from './notifications'

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

export const UPDATE_TABLE_CONFIG_MUTATION = gql`
  mutation updateTableConfiguration(
    $id: ID
    $settings: TableConfigurationInputObject!
  ) {
    config: updateTableConfiguration(id: $id, settings: $settings) {
      id
      title
      columns
      user {
        id
      }
    }
  }
`

export const UPDATE_WATCHLIST_TABLE_CONFIG_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $tableConfigurationId: Int) {
    updateWatchlist(id: $id, tableConfigurationId: $tableConfigurationId) {
      id
      tableConfiguration {
        id
      }
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

const updateTableConfigsOnUpdate = buildConfigsCacheUpdater(
  ({ config: { columns, ...changedItem } }, configs) =>
    configs.map(item => (item.id === changedItem.id ? changedItem : item))
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

export function useUpdateTableConfig () {
  const [mutate, data] = useMutation(UPDATE_TABLE_CONFIG_MUTATION, {
    update: updateTableConfigsOnUpdate
  })

  function updateTableConfig (oldConfig, newConfig) {
    const { id, title, columns } = oldConfig

    return mutate({
      variables: {
        id: +id,
        settings: {
          title: newConfig.title || title,
          columns: JSON.stringify(newConfig.columns || columns)
        }
      }
    })
      .then(({ data: { config } }) => {
        notifyUpdate(config.title)
        return config
      })
      .catch(() => notifyError('Error during the updating set process'))
  }

  return { updateTableConfig, data }
}

const EMPTY_OBJ = {}

export function useUpdateWatchlistTableConfig () {
  const [mutate, { data }] = useMutation(UPDATE_WATCHLIST_TABLE_CONFIG_MUTATION)

  function updateWatchlistTableConfig (id, tableConfigurationId) {
    return mutate({
      variables: {
        id: +id,
        tableConfigurationId: +tableConfigurationId
      }
    })
      .then(() => {})
      .catch(() =>
        notifyError('Error during the connection set to watchlist process')
      )
  }

  const config = data && data.updateWatchlist.tableConfiguration
  const { id } = config || EMPTY_OBJ

  return { updateWatchlistTableConfig, updatedWatchlistTableConfigId: id }
}
