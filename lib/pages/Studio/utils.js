import gql from 'graphql-tag';
import { parse } from 'query-string';
import { push } from 'react-router-redux';
import { SidewidgetType } from 'studio/stores/widgets';
import { clearSavedComment, lookupSavedComment, scrollToComment } from 'webkit/ui/Comments/utils';
import { client } from '../../apollo';
import { store } from '../../redux';
import { showNotification } from '../../actions/rootActions';
export const SHORT_URL_OFFSET = '/charts/'.length;
export const SHORT_URL_POSTFIX = '__sCl';
export const SHORT_URL_RIGHT_INDEX = -SHORT_URL_POSTFIX.length;
export const buildChartShortPath = shortUrl => `/charts/${shortUrl}${SHORT_URL_POSTFIX}`;
const UPDATE_SHORT_URL_MUTATION = gql`
  mutation updateShortUrl($shortUrl: String!, $fullUrl: String!) {
    updateShortUrl(shortUrl: $shortUrl, fullUrl: $fullUrl) {
      shortUrl
    }
  }
`;
export const updateShortUrl = (shortUrl, fullUrl) => client.mutate({
  mutation: UPDATE_SHORT_URL_MUTATION,
  variables: {
    shortUrl,
    fullUrl
  }
});
export const getShortUrlHash = url => url.slice(url.lastIndexOf('/') + 1, SHORT_URL_RIGHT_INDEX);
export function onAnonComment() {
  store.dispatch(showNotification({
    title: 'Your comment was saved and will be posted after sign up'
  }));
  return store.dispatch(push('/login'));
}
export function onCommentError() {
  store.dispatch(showNotification({
    title: "Couldn't post the comment. Please, contact our support"
  }));
}
export function handleSavedComment(settings) {
  window.onCommentsLoaded = () => {
    delete window.onCommentsLoaded;
    const node = document.querySelector(`textarea[name="comment"]`);

    if (node) {
      const comment = lookupSavedComment();

      if (comment) {
        node.value = comment.content;
        clearSavedComment();
      }
    }
  };

  settings.sidewidget = SidewidgetType.LAYOUT_COMMENTS;
}
export function handleLayoutCommentLink(settings, search) {
  const {
    comment
  } = parse(search);
  if (!comment) return;

  window.onCommentsLoaded = () => {
    delete window.onCommentsLoaded;
    const node = document.querySelector(`#comment-${comment} .content`);
    if (node) scrollToComment(node, undefined, 'end');
  };

  settings.sidewidget = SidewidgetType.LAYOUT_COMMENTS;
}
export function onDefaultLayoutAddressSelect() {
  store.dispatch(showNotification({
    title: 'It can take a while to load the address metrics'
  }));
}