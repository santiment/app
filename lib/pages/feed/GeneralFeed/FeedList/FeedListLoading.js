function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { extractEventsFromData, isBottom, makeFeedVariables } from '../utils';
import debounce from 'lodash.debounce';
import FeedList from './FeedList';
import isEqual from 'lodash.isequal';

class FeedListLoading extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isEndCommon: false,
      events: this.props.events,
      sortType: this.props.sortType,
      filters: this.props.filters
    };
    this.unmounted = false;

    this.eventsUpdater = (prev, next) => {
      const {
        fetchMoreResult
      } = next;
      if (!fetchMoreResult) return prev;
      const data = extractEventsFromData(fetchMoreResult);
      return {
        timelineEvents: [{
          events: [...data],
          cursor: fetchMoreResult.timelineEvents[0].cursor,
          __typename: 'TimelineEventsPaginated'
        }]
      };
    };

    this.onLoadMore = (fetchMore, updater) => {
      const {
        events
      } = this.state;

      if (!events.length) {
        return null;
      }

      const {
        sortType,
        filters
      } = this.props; // [GarageInc]: less by 1 second, because API returns old event for that date

      const newDate = new Date(new Date(events[events.length - 1].insertedAt).getTime() - 1000);
      const variables = makeFeedVariables({
        date: newDate,
        orderBy: sortType.type,
        filterBy: filters
      });
      return fetchMore({
        variables: variables,
        updateQuery: updater
      });
    };

    this.loadPart = (isEnd, fetchMore, updater) => {
      if (isEnd) {
        return;
      }

      this.onLoadMore(fetchMore, updater);
    };

    this.handleScroll = debounce(event => {
      const wrappedElement = document.getElementById('root');
      const {
        isLoading
      } = this.props;

      if (!isLoading && isBottom(wrappedElement) && !this.unmounted) {
        const {
          fetchMoreCommon
        } = this.props;
        const {
          isEndCommon
        } = this.state;
        this.loadPart(isEndCommon, fetchMoreCommon, this.eventsUpdater);
      }
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    this.unmounted = true;
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const {
      events: propEvents,
      sortType: propsSortType,
      filters: propFilters
    } = nextProps;
    const {
      events: currentEvents,
      sortType: stateSortType,
      filters: stateFilters
    } = this.state;
    const isNewEventsList = !isEqual(propsSortType, stateSortType) || !isEqual(propFilters, stateFilters);

    if (isNewEventsList) {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        events: [],
        sortType: propsSortType,
        filters: propFilters,
        isEndCommon: false,
        isNewEventsList
      }));
      return;
    }

    const filtered = this.getFilteredEvents({
      events: propEvents
    });

    if (filtered.length > 0) {
      const [event] = propEvents;

      if (!currentEvents.find(({
        id
      }) => id === event.id)) {
        const newEvents = this.state.events;
        newEvents.push(...propEvents);
        this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
          events: newEvents,
          isNewEventsList
        }));
      }
    } else {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        isEndCommon: true,
        isNewEventsList
      }));
    }
  }

  getFilteredEvents({
    events
  }) {
    return events.filter(({
      post,
      payload,
      trigger
    }) => post || trigger && payload);
  }

  render() {
    const {
      isLoading,
      showProfileExplanation
    } = this.props;
    const {
      isNewEventsList,
      events
    } = this.state;
    const filtered = this.getFilteredEvents({
      events
    });
    return /*#__PURE__*/React.createElement(FeedList, {
      events: filtered,
      isLoading: isLoading,
      isNewEventsList: isNewEventsList,
      showProfileExplanation: showProfileExplanation
    });
  }

}

export default FeedListLoading;