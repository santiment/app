export const extractYoutubeId = link => {
  if (!link) {
    return null
  }

  const items = link.split('=')
  return items[items.length - 1]
}
