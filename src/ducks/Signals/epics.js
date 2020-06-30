import React from 'react'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import * as actions from './common/actions'
import * as rootActions from './../../actions/types'
import { showNotification } from './../../actions/rootActions'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { TRIGGERS_QUERY } from './common/queries'
import GA from './../../utils/tracking'
import { GA_FIRST_SIGNAL } from '../../enums/GaEvents'
import SignalNotificationActions from './notifications/SignalNotificationActions'

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
    .debounceTime(200)
    .switchMap(
      ({
        payload: { tags = [], __typename, isActive, shouldReload, ...trigger }
      }) => {
        const create = client.mutate({
          mutation: CREATE_TRIGGER_QUERY,
          variables: {
            ...trigger,
            tags
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createTrigger: {
              __typename: 'UserTrigger',
              userId: -1,
              trigger: {
                __typename: 'Trigger',
                ...trigger,
                tags,
                isActive: false,
                id: -1
              }
            }
          },
          update: (proxy, newData) => {
            if (shouldReload) {
              let data = proxy.readQuery({ query: TRIGGERS_QUERY })
              try {
                const newTrigger = {
                  ...newData.data.createTrigger.trigger,
                  cooldown: '1h',
                  isActive: true
                }

                if (
                  newTrigger.id > 0 &&
                  data.currentUser.triggers.length === 0
                ) {
                  GA.event(GA_FIRST_SIGNAL)
                }

                data.currentUser.triggers = [
                  ...data.currentUser.triggers,
                  newTrigger
                ]
              } catch {
                /* handle error */
              }
              proxy.writeQuery({ query: TRIGGERS_QUERY, data })
            }
          }
        })

        return Observable.fromPromise(create)
          .mergeMap(props => {
            const {
              data: {
                createTrigger: { trigger }
              }
            } = props
            return Observable.merge(
              Observable.of({
                type: actions.SIGNAL_CREATE_SUCCESS,
                payload: trigger
              }),
              Observable.of(
                showNotification({
                  title: 'Alert was succesfully created',
                  description: (
                    <SignalNotificationActions
                      signal={trigger}
                      toLink={'/sonar/signal/' + trigger.id}
                    />
                  )
                })
              )
            )
          })
          .catch(handleErrorAndTriggerAction(actions.SIGNAL_CREATE_FAILED))
      }
    )

export const fetchSignalsEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SIGNAL_FETCH_ALL)
    .takeUntil(action$.ofType(rootActions.USER_LOGIN_SUCCESS))
    .switchMap(() => {
      return Observable.fromPromise(client.query({ query: TRIGGERS_QUERY }))
        .mergeMap(({ data: { currentUser } = {} }) => {
          const { triggers = [] } = currentUser || {}
          return Observable.of({
            type: actions.SIGNAL_FETCH_ALL_SUCCESS,
            payload: {
              triggers
            }
          })
        })
        .catch(handleErrorAndTriggerAction(actions.SIGNAL_FETCH_ALL_ERROR))
    })

export const TRIGGER_TOGGLE_QUERY = gql`
  mutation updateTrigger($id: Int, $isActive: Boolean) {
    updateTrigger(id: $id, isActive: $isActive) {
      trigger {
        isActive
        id
      }
    }
  }
`

export const toggleSignalEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SIGNAL_TOGGLE_BY_ID)
    .switchMap(({ payload: { id, isActive } }) => {
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

export const TRIGGER_UPDATE_QUERY = gql`
  mutation updateTrigger(
    $id: Int
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
        isRepeating
        settings
      }
    }
  }
`

export const updateSignalEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SIGNAL_UPDATE)
    .switchMap(({ payload: { tags, __typename, ...trigger } }) => {
      const toggle = client.mutate({
        mutation: TRIGGER_UPDATE_QUERY,
        variables: { ...trigger }
      })

      return Observable.fromPromise(toggle)
        .mergeMap(({ data: { updateTrigger } }) => {
          return Observable.merge(
            Observable.of({
              type: actions.SIGNAL_UPDATE_SUCCESS,
              payload: {
                id: updateTrigger.trigger.id
              }
            }),
            Observable.of(showNotification('Alert was succesfully updated'))
          )
        })
        .catch(handleErrorAndTriggerAction(actions.SIGNAL_UPDATE_FAILED))
    })

export const TRIGGER_REMOVE_QUERY = gql`
  mutation removeTrigger($id: Int!) {
    removeTrigger(id: $id) {
      trigger {
        id
      }
    }
  }
`

export const removeSignalEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SIGNAL_REMOVE_BY_ID)
    .switchMap(({ payload: { id } }) => {
      const toggle = client.mutate({
        mutation: TRIGGER_REMOVE_QUERY,
        variables: { id },
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
          let data = proxy.readQuery({ query: TRIGGERS_QUERY })
          if (data.currentUser.triggers) {
            data.currentUser.triggers = data.currentUser.triggers.filter(
              obj => +obj.id !== +id
            )
            proxy.writeQuery({ query: TRIGGERS_QUERY, data })
          }
        }
      })

      return Observable.fromPromise(toggle)
        .mergeMap(({ data: { removeTrigger } }) => {
          return Observable.merge(
            Observable.of({
              type: actions.SIGNAL_REMOVE_BY_ID_SUCCESS,
              payload: { id: removeTrigger.trigger.id }
            }),
            Observable.of(showNotification('Alert has been removed'))
          )
        })
        .catch(action => {
          return Observable.merge(
            handleErrorAndTriggerAction(actions.SIGNAL_REMOVE_BY_ID_FAILED)(
              action,
              { id }
            ),
            Observable.of(
              showNotification({
                title: 'Alert has not been removed',
                variant: 'error'
              })
            )
          )
        })
    })
