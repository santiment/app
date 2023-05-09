import React, { Fragment } from 'react';
import cx from 'classnames';
import { TODAY, YESTERDAY } from './dates';
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer';
import SonarFeedRecommendations from '../../../SonarFeed/SonarFeedRecommendations';
import Loader from '@santiment-network/ui/Loader/Loader';
import MakeProSubscriptionCard from '../MakeProSubscriptionCard/MakeProSubscriptionCard';
import { getDateFormats } from '../../../../utils/dates';
import StoriesList from '../../../../components/Stories/StoriesList';
import PageLoader from '../../../../components/Loader/PageLoader';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';
import styles from './FeedList.module.css';
import externalStyles from '../GeneralFeed.module.css';
import feedItemStyles from './../FeedItemRenderer/FeedItemRenderer.module.css';

const getEventDate = ({
  insertedAt,
  publishedAt
}) => insertedAt ? new Date(insertedAt) : new Date(publishedAt);

export const makeDateLabel = date => {
  switch (date.toLocaleDateString()) {
    case TODAY:
      {
        return 'Today';
      }

    case YESTERDAY:
      {
        return 'Yesterday';
      }

    default:
      {
        const {
          DD,
          MMM,
          YYYY
        } = getDateFormats(date);
        return `${DD} ${MMM}, ${YYYY}`;
      }
  }
};

const checkItemWithIndex = (group, item, index) => {
  if (index === 1) {
    item.addProCard = true;
  }

  if (index === 3) {
    item.addStories = true;
  }

  item.index = index;
  group.items.push(item);
};

export const groupByDates = events => {
  const groups = [];

  for (let i = 0; i < events.length;) {
    const item = events[i];
    const date = getEventDate(item);
    const group = {
      date: date,
      items: [],
      label: makeDateLabel(date)
    };
    checkItemWithIndex(group, item, i);

    while (++i < events.length && date.toLocaleDateString() === getEventDate(events[i]).toLocaleDateString()) {
      checkItemWithIndex(group, events[i], i);
    }

    groups.push(group);
  }

  return groups;
};

const FeedList = ({
  events,
  isLoading,
  isNewEventsList,
  showProfileExplanation
}) => {
  if (isNewEventsList && isLoading) {
    return /*#__PURE__*/React.createElement("div", {
      className: externalStyles.scrollable
    }, /*#__PURE__*/React.createElement(PageLoader, null));
  }

  const hasData = events && events.length > 0;
  const groups = groupByDates(events);
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasData ? /*#__PURE__*/React.createElement(RenderFeedGroups, {
    groups: groups,
    showProfileExplanation: showProfileExplanation
  }) : /*#__PURE__*/React.createElement(SonarFeedRecommendations, {
    description: "There are not any activities yet"
  }), isLoading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }));
};

export const RenderFeedGroups = ({
  groups,
  showProfileExplanation,
  groupRenderer: GroupRenderer = RenderFeedGroupItems
}) => {
  return groups.map((item, index) => {
    const {
      label,
      items
    } = item;
    return /*#__PURE__*/React.createElement(Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(styles.date, index !== 0 && styles.next)
    }, label), /*#__PURE__*/React.createElement(GroupRenderer, {
      groupIndex: index,
      items: items,
      showProfileExplanation: showProfileExplanation
    }));
  });
};
export const RenderFeedGroupItems = ({
  items,
  groupIndex,
  showProfileExplanation
}) => {
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement(React.Fragment, null, items.map((item, itemIndex) => /*#__PURE__*/React.createElement(Fragment, {
    key: itemIndex
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(FeedItemRenderer, {
    item: item,
    index: groupIndex,
    showProfileExplanation: showProfileExplanation
  }), !isPro && item.addProCard && /*#__PURE__*/React.createElement(MakeProSubscriptionCard, {
    classes: feedItemStyles
  })), item.addStories && /*#__PURE__*/React.createElement(StoriesList, {
    classes: styles,
    showScrollBtns: true
  }))));
};
export default FeedList;