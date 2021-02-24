export function getBlockMinHeight (items) {
  return items.length > 3 ? '100px' : `${32 * items.length}px`
}
