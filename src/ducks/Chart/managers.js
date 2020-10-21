export const Plotter = () => ({
  items: new Map(),
  delete (id) {
    this.items.delete(id)
  },
  register (id, clb) {
    this.items.set(id, clb)
  }
})

export const Observer = () => {
  const subscribers = new Set()
  const envoke = subscriber => subscriber()

  return {
    emit () {
      subscribers.forEach(envoke)
    },
    subscribe (subscriber) {
      subscribers.add(subscriber)

      return () => {
        subscribers.delete(subscriber)
      }
    }
  }
}
