const PriceGraphCache = new Map()

export function normalizeGraphData (graph, items = [], range = '7d', loading) {
  if (loading) {
    return items
  }

  const key = `priceChart${range}`

  const normalizedItems = items.map(item => {
    const cached = PriceGraphCache.get(item.slug)

    if (cached && cached[key]) {
      const res = { ...item }
      res[key] = cached[key]
      return res
    } else {
      const graphData = []

      graph.forEach(tick => {
        const tickData = tick.data.find(({ slug }) => slug === item.slug) || {}
        graphData.push({ value: tickData.value, datetime: tick.datetime })
      })

      const realData = graphData.filter(({ value }) => value !== undefined)

      const res = {}
      res[key] = realData.length > 0 ? graphData : null

      if (realData.length > 0) {
        PriceGraphCache.set(item.slug, { ...cached, ...res })
        return { ...item, ...res }
      } else {
        return { ...item, ...res }
      }
    }
  })

  return normalizedItems
}
