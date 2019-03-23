import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import * as actions from './actions'
import { handleErrorAndTriggerAction } from '../../epics/utils'

export const CREATE_TRIGGER_QUERY = gql`
  mutation createTrigger(
    $settings: json!
    $isPublic: Boolean
    $cooldown: String
    $tags: [String]
    $title: String!
    $description: String
  ) {
    createTrigger(
      settings: $settings
      isPublic: $isPublic
      cooldown: $cooldown
      tags: $tags
      title: $title
      description: $description
    ) {
      userId
      trigger {
        id
        isPublic
        settings
        title
        description
        tags {
          name
        }
      }
    }
  }
`

export const createSignalEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SIGNAL_CREATE)
    .switchMap(
      ({
        payload: {
          settings,
          isPublic = false,
          cooldown = '30m',
          title = '',
          description = ''
        }
      }) => {
        const create = client.mutate({
          mutation: CREATE_TRIGGER_QUERY,
          variables: {
            settings: JSON.stringify(settings),
            isPublic,
            cooldown,
            title,
            description,
            tags: []
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createTrigger: {
              __typename: 'UserTrigger',
              userId: -1,
              trigger: {
                id: +new Date()
              }
            }
          }
        })

        return Observable.fromPromise(create)
          .mergeMap(({ data: { id } }) => {
            return Observable.of({
              type: actions.SIGNAL_CREATE_SUCCESS,
              payload: {
                id
              }
            })
          })
          .catch(handleErrorAndTriggerAction(actions.SIGNAL_CREATE_FAILED))
      }
    )

export const USER_TRIGGER_QUERY = gql`
  query {
    currentUser {
      id
      triggers {
        id
        isPublic
        cooldown
        settings
        title
        description
        tags {
          name
        }
      }
    }
  }
`

export const fetchSignalsEpic = (action$, store, { client }) =>
  action$.ofType(actions.SIGNAL_FETCH_ALL).switchMap(() => {
    return Observable.fromPromise(client.query({ query: USER_TRIGGER_QUERY }))
      .mergeMap(({ data }) => {
        return Observable.of({
          type: actions.SIGNAL_FETCH_ALL_SUCCESS,
          payload: {
            triggers: data.currentUser.triggers
          }
        })
      })
      .catch(handleErrorAndTriggerAction(actions.SIGNAL_FETCH_ALL_ERROR))
  })

export const TRIGGER_TOGGLE_QUERY = gql`
  mutation updateTrigger($id: Int, $active: Boolean) {
    updateTrigger(id: $id, active: $active) {
      trigger {
        active
        id
      }
    }
  }
`

export const toggleSignalEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SIGNAL_TOGGLE_BY_ID)
    .switchMap(({ payload: { id, active } }) => {
      const toggle = client.mutate({
        mutation: TRIGGER_TOGGLE_QUERY,
        variables: {
          id,
          active
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTrigger: {
            __typename: 'UserTrigger',
            userId: -1,
            trigger: {
              __typename: 'Trigger',
              id,
              active
            }
          }
        }
      })

      return Observable.fromPromise(toggle)
        .mergeMap(({ data: { updateTrigger } }) => {
          return Observable.of({
            type: actions.SIGNAL_TOGGLE_SUCCESS,
            payload: {
              id: updateTrigger.trigger.id
            }
          })
        })
        .catch(handleErrorAndTriggerAction(actions.SIGNAL_TOGGLE_FAILED))
    })

export const HISTORICAL_TRIGGER_POINTS_QUERY = gql`
  query historicalTriggerPoints($cooldown: String, $settings: json!) {
    historicalTriggerPoints(cooldown: $cooldown, settings: $settings)
  }
`

export const fetchHistorySignalPoints = (action$, store, { client }) =>
  action$.ofType(actions.SIGNAL_FETCH_HISTORY_POINTS).switchMap(action => {
    return Observable.fromPromise(
      client.query({
        query: HISTORICAL_TRIGGER_POINTS_QUERY,
        variables: {
          cooldown: action.payload.cooldown,
          settings: JSON.stringify(action.payload.settings)
        }
      })
    )
      .debounceTime(200)
      .mergeMap(({ data }) => {
        return Observable.of({
          type: actions.SIGNAL_FETCH_HISTORY_POINTS_SUCCESS,
          payload: {
            points: data.historicalTriggerPoints
          }
        })
      })
      .catch(
        handleErrorAndTriggerAction(actions.SIGNAL_FETCH_HISTORY_POINTS_FAILED)
      )
  })
