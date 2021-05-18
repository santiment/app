import { useState, useEffect } from 'react'
import { get } from 'svelte/store'

export const getSvelteContext = (cmp, ctx) => cmp && cmp.$$.context.get(ctx)
export function useStore (store, immute = _ => _) {
  const [state, setState] = useState(() => store && get(store))
  useEffect(
    () =>
      store &&
      store.subscribe(value => {
        setState(immute(value))
      }),
    [store]
  )
  return state
}
