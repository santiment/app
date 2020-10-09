import { useRef } from 'react'

export const usePlotter = () =>
  useRef({
    items: new Map(),
    register (id, clb) {
      this.items.set(id, clb)
    }
  }).current
