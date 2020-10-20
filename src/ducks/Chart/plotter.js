import { useRef } from 'react'

export const usePlotter = () =>
  useRef({
    items: new Map(),
    delete (id) {
      this.items.delete(id)
    },
    register (id, clb) {
      this.items.set(id, clb)
    }
  }).current

export const Plotter = () => ({
  items: new Map(),
  delete (id) {
    this.items.delete(id)
  },
  register (id, clb) {
    this.items.set(id, clb)
  }
})
