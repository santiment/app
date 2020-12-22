import { useState, useCallback } from 'react'
import { ALL_ASSETS_TEXT, MESSAGES, idNameMap } from './utils'

export const useMessage = state => {
  const [message, setMessage] = useState('')

  const updateMessage = useCallback(
    () => {
      if (!state && message !== MESSAGES.empty) {
        setMessage(MESSAGES.empty)
      }

      if (state === ALL_ASSETS_TEXT && message !== MESSAGES.allAssets) {
        setMessage(MESSAGES.allAssets)
      }

      if (state && state !== ALL_ASSETS_TEXT && message !== '') {
        setMessage('')
      }
    },
    [state]
  )

  return {
    message,
    updateMessage
  }
}

export function useStateMetadata (state) {
  const watchlistIDs = Array.isArray(state)
    ? state.filter(item => !!item.watchlistId).map(item => item.watchlistId)
    : []
  const listsWithoutData = watchlistIDs.filter(id => !idNameMap.has(id))
  const names = watchlistIDs.map(id => idNameMap.get(id) || id)

  return { metadata: names }
}
