import { getIdFromSEOLink, getSEOLinkFromIdAndTitle } from 'webkit/utils/url'

export const makeLinkToInsight = (id, title) =>
  'https://insights.santiment.net/' + getSEOLinkFromIdAndTitle(id, title)

export { getIdFromSEOLink, getSEOLinkFromIdAndTitle }
