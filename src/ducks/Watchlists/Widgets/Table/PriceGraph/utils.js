export function normalizeGraphData (graph, items = []) {
  const normalizedItems = items.map(item => {
    const graphData = []
    graph.forEach(tick => {
      const tickData = tick.data.find(({ slug }) => slug === item.slug) || {}
      graphData.push({ value: tickData.value, datetime: tick.datetime })
    })

    return { ...item, priceChart7d: graphData }
  })

  return normalizedItems
}
