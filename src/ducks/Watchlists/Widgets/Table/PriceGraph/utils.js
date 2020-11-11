const PriceGraphCache = new Map()

export function normalizeGraphData (graph, items = []) {
  const normalizedItems = items.map(item => {
    const cached = PriceGraphCache.get(item.slug)

    if (cached) {
      return { ...item, priceChart7d: cached }
    } else {
      const graphData = []

      graph.forEach(tick => {
        const tickData = tick.data.find(({ slug }) => slug === item.slug) || {}
        graphData.push({ value: tickData.value, datetime: tick.datetime })
      })

      const realData = graphData.filter(({ value }) => value !== undefined)

      if (realData.length > 0) {
        PriceGraphCache.set(item.slug, graphData)
        return { ...item, priceChart7d: graphData }
      } else {
        return { ...item, priceChart7d: null }
      }
    }
  })

  return normalizedItems
}
