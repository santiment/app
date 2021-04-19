import React, { useState, useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useConversations } from './hooks'
import { Skeleton } from '../../../components/Skeleton'
import Conversation from './Conversation/Conversation'
import styles from './Conversations.module.scss'

const NOW = 'utc_now'

const Conversations = () => {
  const [upTo] = useState(NOW)

  const [conversations, setConversations] = useState([])
  const [canLoad, setCanLoad] = useState(true)

  const { data, loading } = useConversations({ to: upTo })

  useEffect(
    () => {
      if (data.length > 0) {
        setConversations([...conversations, ...data])
      }

      if (!loading && data.length === 0) {
        setCanLoad(false)
      }
    },
    [data]
  )

  const loadMore = useCallback(
    () => {
      if (!loading && canLoad) {
        // const last = conversations[conversations.length - 1]
        // setToDate(last ? last.insertedAt : NOW)
      }
    },
    [loading, canLoad, conversations]
  )

  return (
    <div className={styles.container}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && canLoad}
        loader={
          <Skeleton show={loading} key='loader' className={styles.skeleton} />
        }
        threshold={0}
      >
        {data.map(item => (
          <Conversation data={item} key={item.id} classname={styles.item} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Conversations
