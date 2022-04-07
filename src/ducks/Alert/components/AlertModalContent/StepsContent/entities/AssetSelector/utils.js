export function hasAssetById({ id, listItems }) {
  if (!id || !listItems) return
  return listItems.some(({ id: projectId }) => projectId === id)
}
