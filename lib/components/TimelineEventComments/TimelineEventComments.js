import React from 'react';
import { CommentsType } from 'san-webkit/lib/api/comments';
import { CommentsButton } from '../Comments';

const TimelineEventComments = ({
  id,
  authorId,
  entityType,
  commentsCount
}) => {
  return /*#__PURE__*/React.createElement(CommentsButton, {
    type: entityType || CommentsType.TimelineEvent,
    commentsFor: {
      id,
      user: {
        id: authorId
      }
    },
    count: commentsCount
  });
};

export default TimelineEventComments;