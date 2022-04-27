import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Loader from '@santiment-network/ui/Loader/Loader'
import Avatar from './Avatar'
import Text from './Text'
import { getInsightText } from './queries'
import styles from './Insight.module.scss'

import { CommentsType } from 'webkit/api/comments'
import { Comments } from '@cmp/Comments'

const Action = ({ type, isDisabled, ...props }) => (
  <div {...props} className={cx(styles.action, styles[type], isDisabled && styles.action_disabled)}>
    <Icon type='arrow-right-big' />
  </div>
)

const Insight = ({
  id,
  title,
  user,
  isPulseInsights,
  isFirst,
  isLast,
  onPrevClick,
  onNextClick,
}) => {
  const [loading, setLoading] = useState()
  const [text, setText] = useState()
  const { username, avatarUrl } = user

  useEffect(() => {
    let comments
    const timer = setTimeout(() => comments || setLoading(true), 300)

    if (isPulseInsights) {
      getInsightText(id).then(setText)
    }

    function onKeyDown({ target, key }) {
      if (target !== document.body) return

      // eslint-disable-next-line
      switch (key) {
        case 'ArrowLeft':
          return isFirst || onPrevClick()
        case 'ArrowRight':
          return isLast || onNextClick()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.top}>
          <a className={styles.title} href={`https://insights.santiment.net/read/${id}`}>
            {title}
          </a>
          <div className={styles.actions}>
            <Action type='left' onClick={onPrevClick} isDisabled={isFirst} />
            <Action type='right' onClick={onNextClick} isDisabled={isLast} />
          </div>
        </div>
        <a className={styles.user} href={`/profile/${user.id}`}>
          <Avatar className={styles.user__avatar} src={avatarUrl} />
          {username}
        </a>
      </div>
      {text && <Text text={text} />}

      <Comments type={CommentsType.Insight} commentsFor={{ id, user }} titleClass='h4 c-waterloo' />
      {loading && <Loader className={styles.loader} />}
    </>
  )
}

export default React.memo(Insight)
