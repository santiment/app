import { client } from '../../index'

export const buildRefetcher = query => () =>
  client.query({
    query,
    fetchPolicy: 'network-only'
  })

export const update = (prevState, updater) =>
  typeof updater === 'function' ? updater(prevState) : updater
