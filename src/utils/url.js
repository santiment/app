export const getIdFromSEOLink = (link) => parseInt(link.slice(link.lastIndexOf('-') + 1), 10)

export const getSEOLinkFromIdAndTitle = (id, title = '') =>
<<<<<<< HEAD
  encodeURIComponent(
    `${title
      .toLowerCase()
      .split(' ')
      .join('-')}-${id}`,
  )
=======
  encodeURIComponent(`${title.toLowerCase().split(' ').join('-')}-${id}`)
>>>>>>> master
