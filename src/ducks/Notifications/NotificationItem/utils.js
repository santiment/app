import React from 'react'
import Markdown from 'react-markdown'
import Icon from '@santiment-network/ui/Icon'
import InsightTags from '../../../components/Insight/InsightTags'
import { makeLinkToInsight } from '../../../components/Insight/InsightCardInternals'
import { prepareAlertTitle } from '../../Signals/link/utils'
import styles from './NotificationItem.module.scss'

export const TRIGGER_FIRED = 'trigger_fired'
export const PUBLISH_INSIGHT = 'publish_insight'

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
        <>
          {payload[Object.keys(payload)[0]] ? (
            <Markdown
              source={payload[Object.keys(payload)[0]]}
              className={styles.activityMarkdown}
            />
          ) : (
            prepareAlertTitle(trigger.title)
          )}
        </>
      )
    }
    case PUBLISH_INSIGHT: {
      return `${username || email} has created insight '${post.title}'`
    }
    default: {
      return null
    }
  }
}

export const getLink = data => {
  const { eventType, trigger, post } = data

  switch (eventType) {
    case TRIGGER_FIRED: {
      return `/alerts/${trigger.id}`
    }
    case PUBLISH_INSIGHT: {
      return makeLinkToInsight(post.id, post.title)
    }
    default: {
      return null
    }
  }
}

export const getTypes = (data, isAuthor) => {
  const { eventType, post } = data

  switch (eventType) {
    case TRIGGER_FIRED: {
      return <Tag>{isAuthor ? 'my alerts' : 'alert'}</Tag>
    }
    case PUBLISH_INSIGHT: {
      const { isPaywallRequired, tags } = post

      return (
        <>
          {isPaywallRequired && <Icon type='crown' className={styles.crown} />}
          {tags ? (
            <InsightTags tags={tags} className={styles.type} isDesktop={true} />
          ) : (
            <Tag>insights</Tag>
          )}
        </>
      )
    }
    default: {
      return <Tag>alert</Tag>
    }
  }
}

const Tag = ({ children }) => <div className={styles.type}>{children}</div>
