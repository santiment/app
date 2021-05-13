import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import InfiniteScroll from 'react-infinite-scroller'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Tabs from '@santiment-network/ui/Tabs'
import Panel from '@santiment-network/ui/Panel'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { Skeleton } from '../../../components/Skeleton'
import { useTimelineEvents } from './hooks'
import styles from './NotificationsFeed.module.scss'
import NotificationItem from '../NotificationItem/NotificationItem'

const NOW = 'utc_now'

const TABS = ['All notifications', 'Following']

const NotificationsFeed = ({}) => {
  const [upTo, setToDate] = useState(NOW)
  const [activeTab, setTab] = useState(TABS.ALL)
  const [events, setEvents] = useState([])
  const [canLoad, setCanLoad] = useState(true)

  const { data: { events: chunk, cursor } = {}, loading } = useTimelineEvents({
    to: upTo
  })

  useEffect(
    () => {
      if (chunk && chunk.length > 0) {
        setEvents([...events, ...chunk])
      }

      if (!loading && chunk && chunk.length === 0) {
        setCanLoad(false)
      }
    },
    [chunk]
  )

  console.log(chunk)

  function loadMore () {
    if (!loading && canLoad) {
      const last = events[events.length - 1]

      if (last && upTo !== last.insertedAt) {
        // [GarageInc | 13.05.2021]: less by 1 second, because API returns old event for that date
        const toDate = new Date(new Date(last.insertedAt).getTime() - 1000)
        setToDate(toDate)
      } else {
        setToDate(NOW)
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        open={true}
        passOpenStateAs='data-isactive'
        position='bottom'
        align='end'
        className={styles.dropdown}
        trigger={<Icon type='bell' className={styles.icon} />}
      >
        <PanelWithHeader
          className={styles.panel}
          headerClassName={styles.header}
          header={
            <div>
              <Tabs
                className={styles.tabs}
                options={TABS}
                defaultSelectedIndex={activeTab}
                onSelect={tab => setTab(tab)}
                classes={styles}
              />
            </div>
          }
        >
          <div className={styles.content}>
            <div className={styles.scroller}>
              <div className={cx(styles.list)}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={!loading && canLoad}
                  loader={
                    <Skeleton
                      show={loading}
                      key='loader'
                      className={styles.skeleton}
                    />
                  }
                  threshold={200}
                  useWindow={false}
                >
                  {events.map(item => (
                    <NotificationItem
                      data={item}
                      key={item.id}
                      classname={styles.item}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </PanelWithHeader>
      </ContextMenu>
    </div>
  )
}

export default NotificationsFeed
