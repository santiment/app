import { getIdFromSEOLink, getSEOLinkFromIdAndTitle } from 'san-webkit/lib/utils/url';
export const makeLinkToInsight = (id, title) => '/insights/read/' + getSEOLinkFromIdAndTitle(id, title);
export { getIdFromSEOLink, getSEOLinkFromIdAndTitle };