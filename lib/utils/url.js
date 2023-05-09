import { getIdFromSEOLink, getSEOLinkFromIdAndTitle } from 'webkit/utils/url';
export const makeLinkToInsight = (id, title) => '/insights/read/' + getSEOLinkFromIdAndTitle(id, title);
export { getIdFromSEOLink, getSEOLinkFromIdAndTitle };