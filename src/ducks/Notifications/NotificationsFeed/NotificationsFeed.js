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
import NotificationTypes from '../NotificationTypes/NotificationTypes'

const NOW = 'utc_now'

const DEFAULT_SETTINGS = {
  date: NOW,
  type: 'ALL',
  author: 'ALL'
}

const TABS = ['All notifications', 'Following']
const TABS_TO_FILTER_AUTHORS = {
  'All notifications': 'ALL',
  Following: 'FOLLOWED'
}

const NotificationsFeed = ({}) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [activeTab, setTab] = useState(TABS[0])
  const [events, setEvents] = useState([])
  const [canLoad, setCanLoad] = useState(true)

  const { data: { events: chunk, cursor } = {}, loading } = useTimelineEvents({
    to: settings.date,
    type: settings.type,
    author: settings.author
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

      if (last && settings.date !== last.insertedAt) {
        // [GarageInc | 13.05.2021]: less by 1 second, because API returns old event for that date
        const toDate = new Date(new Date(last.insertedAt).getTime() - 1000)
        setSettings({
          ...settings,
          date: toDate
        })
      } else {
        setSettings({
          ...settings,
          date: NOW
        })
      }
    }
  }

  function updateSettings (props) {
    setEvents([])
    setSettings({
      ...settings,
      date: NOW,
      ...props
    })
  }

  function onChangeType (type) {
    updateSettings({
      type: type
    })
  }

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        open={true}
        passOpenStateAs='data-isactive'
        position='bottom'
        align='end'
        offsetY={32}
        className={styles.dropdown}
        trigger={<Icon type='bell' className={styles.icon} />}
      >
        <PanelWithHeader
          className={styles.panel}
          headerClassName={styles.header}
          contentClassName={styles.panelContent}
          header={
            <div>
              <Tabs
                className={styles.tabs}
                options={TABS}
                defaultSelectedIndex={activeTab}
                onSelect={tab => {
                  setTab(tab)
                  updateSettings({
                    author: TABS_TO_FILTER_AUTHORS[tab]
                  })
                }}
                classes={styles}
              />
            </div>
          }
        >
          <NotificationTypes onChange={onChangeType} selected={settings.type} />

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
                      className={styles.item}
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
