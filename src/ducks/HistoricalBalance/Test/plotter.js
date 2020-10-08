import { useRef } from 'react'

export const usePlotter = () =>
  useRef({
    items: new Map(),
    register (id, clb) {
      if (process.env.NODE_ENV === 'development') {
        if (this.items.has(id)) {
          throw new Error(`Chart already registered the "${id}" plotter`)
        }
      }

      this.items.set(id, clb)
    }
  }).current
