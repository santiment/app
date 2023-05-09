const _excluded = ["tags", "__typename", "isActive"],
      _excluded2 = ["tags", "__typename"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import * as actions from './common/actions';
import { showNotification } from './../../actions/rootActions';
import { handleErrorAndTriggerAction } from '../../epics/utils';
import { TRIGGERS_QUERY } from './common/queries';
import GA from './../../utils/tracking';
import { GA_FIRST_SIGNAL } from '../../enums/GaEvents';
import SignalNotificationActions from './notifications/SignalNotificationActions';
export const CREATE_TRIGGER_QUERY = gql`
  mutation createTrigger(
    $settings: json!
    $isPublic: Boolean
    $isRepeating: Boolean
    $cooldown: String
    $tags: [String]
    $title: String!
    $description: String
  ) {
    createTrigger(
      settings: $settings
      isPublic: $isPublic
      isRepeating: $isRepeating
      cooldown: $cooldown
      tags: $tags
      title: $title
      description: $description
    ) {
      userId
      trigger {
        id
        isPublic
        isRepeating
        settings
        title
        description
        cooldown
        isActive
        isFrozen
        tags {
          name
        }
      }
    }
  }
`;
export const createSignalEpic = (action$, store, {
  client
}) => action$.ofType(actions.SIGNAL_CREATE).debounceTime(200).switchMap(_ref => {
  let {
    payload: {
      tags = [],
      __typename,
      isActive
    }
  } = _ref,
      trigger = _objectWithoutProperties(_ref.payload, _excluded);

  const create = client.mutate({
    mutation: CREATE_TRIGGER_QUERY,
    variables: _objectSpread(_objectSpread({}, trigger), {}, {
      tags
    }),
    optimisticResponse: {
      __typename: 'Mutation',
      createTrigger: {
        __typename: 'UserTrigger',
        userId: -1,
        trigger: _objectSpread(_objectSpread({
          __typename: 'Trigger'
        }, trigger), {}, {
          tags,
          isActive: false,
          id: -1
        })
      }
    },
    update: (proxy, newData) => {
      let data = proxy.readQuery({
        query: TRIGGERS_QUERY
      });

      try {
        const newTrigger = _objectSpread({}, newData.data.createTrigger.trigger);

        if (newTrigger.id > 0 && data.currentUser.triggers.length === 0) {
          GA.event(GA_FIRST_SIGNAL);
        }

        data.currentUser.triggers = [...data.currentUser.triggers, newTrigger];
      } catch {
        /* handle error */
      }

      proxy.writeQuery({
        query: TRIGGERS_QUERY,
        data
      });
    }
  });
  return Observable.fromPromise(create).mergeMap(props => {
    const {
      data: {
        createTrigger: {
          trigger
        }
      }
    } = props;
    return Observable.merge(Observable.of({
      type: actions.SIGNAL_CREATE_SUCCESS,
      payload: trigger
    }), Observable.of(showNotification({
      title: 'Alert was succesfully created',
      description: /*#__PURE__*/React.createElement(SignalNotificationActions, {
        signal: trigger,
        toLink: '/alerts/' + trigger.id
      })
    })));
  }).catch(handleErrorAndTriggerAction(actions.SIGNAL_CREATE_FAILED));
});
export const TRIGGER_TOGGLE_QUERY = gql`
  mutation updateTrigger($id: Int!, $isActive: Boolean) {
    updateTrigger(id: $id, isActive: $isActive) {
      trigger {
        isActive
        id
      }
    }
  }
`;
export const toggleSignalEpic = (action$, store, {
  client
}) => action$.ofType(actions.SIGNAL_TOGGLE_BY_ID).switchMap(({
  payload: {
    id,
    isActive
  }
}) => {
  const toggle = client.mutate({
    mutation: TRIGGER_TOGGLE_QUERY,
    variables: {
      id,
      isActive
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateTrigger: {
        __typename: 'UserTrigger',
        userId: -1,
        trigger: {
          __typename: 'Trigger',
          id,
          isActive
        }
      }
    }
  });
  return Observable.fromPromise(toggle).mergeMap(({
    data: {
      updateTrigger
    }
  }) => {
    return Observable.of({
      type: actions.SIGNAL_TOGGLE_SUCCESS,
      payload: {
        id: updateTrigger.trigger.id
      }
    });
  }).catch(handleErrorAndTriggerAction(actions.SIGNAL_TOGGLE_FAILED));
});
export const HISTORICAL_TRIGGER_POINTS_QUERY = gql`
  query historicalTriggerPoints($cooldown: String, $settings: json!) {
    historicalTriggerPoints(cooldown: $cooldown, settings: $settings)
  }
`;
export const TRIGGER_UPDATE_QUERY = gql`
  mutation updateTrigger(
    $id: Int!
    $title: String
    $description: String
    $cooldown: String
    $isActive: Boolean
    $isRepeating: Boolean
    $isPublic: Boolean
    $settings: json!
  ) {
    updateTrigger(
      id: $id
      isPublic: $isPublic
      isActive: $isActive
      isRepeating: $isRepeating
      settings: $settings
      cooldown: $cooldown
      title: $title
      description: $description
    ) {
      trigger {
        id
        title
        description
        isPublic
        cooldown
        iconUrl
        isActive
        isFrozen
        isRepeating
        settings
      }
    }
  }
`;
export const updateSignalEpic = (action$, store, {
  client
}) => action$.ofType(actions.SIGNAL_UPDATE).switchMap(_ref2 => {
  let {
    payload: {
      tags,
      __typename
    }
  } = _ref2,
      trigger = _objectWithoutProperties(_ref2.payload, _excluded2);

  const toggle = client.mutate({
    mutation: TRIGGER_UPDATE_QUERY,
    variables: _objectSpread({}, trigger)
  });
  return Observable.fromPromise(toggle).mergeMap(({
    data: {
      updateTrigger
    }
  }) => {
    return Observable.merge(Observable.of({
      type: actions.SIGNAL_UPDATE_SUCCESS,
      payload: updateTrigger.trigger
    }), Observable.of(showNotification('Alert was succesfully updated')));
  }).catch(handleErrorAndTriggerAction(actions.SIGNAL_UPDATE_FAILED));
});
export const TRIGGER_REMOVE_QUERY = gql`
  mutation removeTrigger($id: Int!) {
    removeTrigger(id: $id) {
      trigger {
        id
      }
    }
  }
`;
export const removeSignalEpic = (action$, store, {
  client
}) => action$.ofType(actions.SIGNAL_REMOVE_BY_ID).switchMap(({
  payload: {
    id
  }
}) => {
  const toggle = client.mutate({
    mutation: TRIGGER_REMOVE_QUERY,
    variables: {
      id
    },
    optimisticResponse: {
      __typename: 'Mutation',
      removeTrigger: {
        __typename: 'UserTrigger',
        userId: -1,
        trigger: {
          __typename: 'Trigger',
          id
        }
      }
    },
    update: proxy => {
      let data = proxy.readQuery({
        query: TRIGGERS_QUERY
      });

      if (data.currentUser.triggers) {
        data.currentUser.triggers = data.currentUser.triggers.filter(obj => +obj.id !== +id);
        proxy.writeQuery({
          query: TRIGGERS_QUERY,
          data
        });
      }
    }
  });
  return Observable.fromPromise(toggle).mergeMap(({
    data: {
      removeTrigger
    }
  }) => {
    return Observable.merge(Observable.of({
      type: actions.SIGNAL_REMOVE_BY_ID_SUCCESS,
      payload: {
        id: removeTrigger.trigger.id
      }
    }), Observable.of(showNotification('Alert has been removed')));
  }).catch(action => {
    return Observable.merge(handleErrorAndTriggerAction(actions.SIGNAL_REMOVE_BY_ID_FAILED)(action, {
      id
    }), Observable.of(showNotification({
      title: 'Alert has not been removed',
      variant: 'error'
    })));
  });
});