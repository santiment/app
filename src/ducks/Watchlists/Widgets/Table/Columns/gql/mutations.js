import gql from 'graphql-tag'
import { TABLE_CONFIG_FRAGMENT } from './queries'

export const DELETE_TABLE_CONFIG_MUTATION = gql`
  mutation deleteTableConfiguration($id: Int!) {
    deleteTableConfiguration(id: $id) {
      id
    }
  }
`

export const CREATE_TABLE_CONFIG_MUTATION = gql`
  mutation createTableConfiguration($title: String!, $columns: json) {
    createTableConfiguration(
      settings: { title: $title, isPublic: false, columns: $columns }
    ) {
      ...tableConfig
    }
  }
  ${TABLE_CONFIG_FRAGMENT}
`

export const UPDATE_TABLE_CONFIG_MUTATION = gql`
  mutation createTableConfiguration($id: Int, $title: String!, $columns: json) {
    createTableConfiguration(
      id: $id
      settings: { title: $title, isPublic: false, columns: $columns }
    ) {
      ...tableConfig
    }
  }
  ${TABLE_CONFIG_FRAGMENT}
`

export const UPDATE_WATCHLIST_TABLE_CONFIG_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $tableConfigurationId: Int) {
    updateWatchlist(id: $id, tableConfigurationId: $tableConfigurationId) {
      id
    }
  }
`
