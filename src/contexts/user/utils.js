import { client } from '../../index'

export const buildRefetcher = query => () =>
  client.query({
    query,
    fetchPolicy: 'network-only'
  })
