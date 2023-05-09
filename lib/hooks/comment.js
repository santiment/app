import { useEffect } from 'react';
import { push } from 'react-router-redux';
import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url';
import { lookupSavedComment } from 'webkit/ui/Comments/utils';
import { CommentsType } from 'webkit/api/comments';
import { store } from '../redux';
import { showNotification } from '../actions/rootActions';

function getPath({
  id,
  commentsForTitle,
  type,
  href
}) {
  if (!commentsForTitle) return href;
  const link = getSEOLinkFromIdAndTitle(id, commentsForTitle);

  switch (type) {
    case CommentsType.Layout:
      return `/charts/${link}#comment`;

    default:
      return href;
  }
}

export function useSavedComment(isLoggedIn) {
  useEffect(() => {
    if (!isLoggedIn) return;
    const comment = lookupSavedComment();
    if (!comment) return;
    store.dispatch(showNotification({
      title: 'You have unposted comment',
      dismissAfter: 999999,
      actions: [{
        label: 'View and edit',
        onClick: (_, close) => {
          store.dispatch(push(getPath(comment)));
          close();
        }
      }]
    }));
  }, [isLoggedIn]);
}