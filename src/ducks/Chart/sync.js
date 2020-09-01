import { useMemo } from 'react'

function createSyncDateObserver () {
  let subscribers = new Set()
  let state

  const notify = subscriber => subscriber(state)

  function syncDate (newState) {
    state = newState
    subscribers.forEach(notify)
  }

  function observeSyncDate (subscriber) {
    subscribers.add(subscriber)
    return () => subscribers.delete(subscriber)
  }

  return {
    syncDate,
    observeSyncDate
  }
}

export const useSyncDateObserver = () => useMemo(createSyncDateObserver, [])
