import React from 'react';
import Markdown from 'react-markdown';
import Icon from '@santiment-network/ui/Icon';
import InsightTags from '../../../components/Insight/InsightTags';
import { prepareAlertTitle } from '../../Signals/link/utils';
import styles from './NotificationItem.module.css';
import { makeLinkToInsight } from '../../../utils/url';
export const TRIGGER_FIRED = 'trigger_fired';
export const PUBLISH_INSIGHT = 'publish_insight';
export const getTitle = data => {
  const {
    payload,
    eventType,
    trigger,
    post,
    user: {
      username,
      email
    }
  } = data;

  switch (eventType) {
    case TRIGGER_FIRED:
      {
        return /*#__PURE__*/React.createElement(React.Fragment, null, payload[Object.keys(payload)[0]] ? /*#__PURE__*/React.createElement(Markdown, {
          source: payload[Object.keys(payload)[0]],
          className: styles.activityMarkdown
        }) : prepareAlertTitle(trigger.title));
      }

    case PUBLISH_INSIGHT:
      {
        return `${username || email} has created insight '${post.title}'`;
      }

    default:
      {
        return null;
      }
  }
};
export const getLink = data => {
  const {
    eventType,
    trigger,
    post
  } = data;

  switch (eventType) {
    case TRIGGER_FIRED:
      {
        return `/alerts/${trigger.id}`;
      }

    case PUBLISH_INSIGHT:
      {
        return makeLinkToInsight(post.id, post.title);
      }

    default:
      {
        return null;
      }
  }
};
export const getTypes = (data, isAuthor) => {
  const {
    eventType,
    post
  } = data;

  switch (eventType) {
    case TRIGGER_FIRED:
      {
        return /*#__PURE__*/React.createElement(Tag, null, isAuthor ? 'my alerts' : 'alert');
      }

    case PUBLISH_INSIGHT:
      {
        const {
          isPaywallRequired,
          tags
        } = post;
        return /*#__PURE__*/React.createElement(React.Fragment, null, isPaywallRequired && /*#__PURE__*/React.createElement(Icon, {
          type: "crown",
          className: styles.crown
        }), tags ? /*#__PURE__*/React.createElement(InsightTags, {
          tags: tags,
          className: styles.type,
          isDesktop: true
        }) : /*#__PURE__*/React.createElement(Tag, null, "insights"));
      }

    default:
      {
        return /*#__PURE__*/React.createElement(Tag, null, "alert");
      }
  }
};

const Tag = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.type
}, children);