import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useConversations } from './hooks'
import { Skeleton } from '../../../components/Skeleton'
import Conversation from './Conversation/Conversation'
import styles from './Conversations.module.scss'

const NOW = 'utc_now'

const Conversations = () => {
  const [upTo, setToDate] = useState(NOW)

  const [conversations, setConversations] = useState([])
  const [canLoad, setCanLoad] = useState(true)

  const { data, loading } = useConversations({ to: upTo })

  useEffect(() => {
    if (data.length > 0) {
      setConversations([...conversations, ...data])
    }

    if (!loading && data.length === 0) {
      setCanLoad(false)
    }
  }, [data])

  function loadMore () {
    if (!loading && canLoad) {
      const last = conversations[conversations.length - 1]

      if (last && upTo !== last.insertedAt) {
        // [GarageInc | 20.04.2021]: less by 1 second, because API returns old event for that date
        const toDate = new Date(new Date(last.insertedAt).getTime() - 1000)
        setToDate(toDate)
      } else {
        setToDate(NOW)
      }
    }
  }

  return (
    <div className={styles.container}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && canLoad}
        loader={
          <Skeleton show={loading} key='loader' className={styles.skeleton} />
        }
        threshold={200}
        useWindow={false}
      >
        {conversations.map(item => (
          <Conversation data={item} key={item.id} classname={styles.item} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Conversations
