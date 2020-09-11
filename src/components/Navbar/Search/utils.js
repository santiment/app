export function filterSearchableItems (checkItem, searchableItems, allItems) {
  const filteredItems = []
  const filteredSearchables = []
  const { length } = allItems

  for (let i = 0; i < length; i++) {
    const item = searchableItems[i]
    if (checkItem(item)) {
      filteredSearchables.push(item)
      filteredItems.push(allItems[i])
    }
  }

  return { filteredItems, filteredSearchables }
}
