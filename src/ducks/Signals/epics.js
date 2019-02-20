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
        console.log(cooldown)
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
        title
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
