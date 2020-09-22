import { useMemo, useEffect } from 'react'
import { clearCtx, findPointByDate } from './utils'

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

export function useSyncDateEffect (chartRef, observeSyncDate) {
  useEffect(() => {
    const chart = chartRef.current
    return (
      observeSyncDate &&
      observeSyncDate(syncedDate => {
        if (chart.points.length === 0) return
        if (syncedDate) {
          const point = findPointByDate(chart.points, syncedDate)
          if (point) chart.drawTooltip(point)
        } else {
          clearCtx(chart, chart.tooltip.ctx)
        }
      })
    )
  }, [])
}
