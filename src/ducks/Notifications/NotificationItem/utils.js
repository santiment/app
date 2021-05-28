import React from 'react'
import OpenSignalLink from '../../Signals/link/OpenSignalLink'

export const TRIGGER_FIRED = 'trigger_fired'

export const getTitle = data => {
  const {
    payload,
    eventType,
    trigger,
    post,
    user: { username, email }
  } = data

  switch (eventType) {
    case TRIGGER_FIRED: {
      return (
        payload[Object.keys(payload)[0]] || <OpenSignalLink signal={trigger} />
      )
    }
    case 'publish_insight': {
      return `${username || email} has created insight '${post.title}'`
    }
    default: {
      return null
    }
  }
}

export const getType = (data, isAuthor) => {
  const { eventType } = data

  switch (eventType) {
    case 'trigger_fired': {
      return isAuthor ? 'my alerts' : 'alert'
    }
    case 'publish_insight': {
      return 'insights'
    }
    default: {
      return 'alert'
    }
  }
}
