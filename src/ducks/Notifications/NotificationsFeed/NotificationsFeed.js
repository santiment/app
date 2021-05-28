import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import InfiniteScroll from 'react-infinite-scroller'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Tabs from '@santiment-network/ui/Tabs'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { Skeleton } from '../../../components/Skeleton'
import { useTimelineEvents } from './hooks'
import NotificationItem from '../NotificationItem/NotificationItem'
import NotificationTypes from '../NotificationTypes/NotificationTypes'
import NoNotitications from '../NoNotitications/NoNotitications'
import styles from './NotificationsFeed.module.scss'
import NoNotiticationsForTag from '../NoNotitications/NoNotiticationsForTag'

const LAST_UPDATES_KEY = 'NOTIFICATIONS__LAST_UPDATES_KEY'
const NOW = 'utc_now'
const LAST_UPDATES_DATE = localStorage.getItem(LAST_UPDATES_KEY)
  ? new Date(localStorage.getItem(LAST_UPDATES_KEY))
  : undefined

const saveLastLoadedToLS = date => {
  localStorage.setItem(LAST_UPDATES_KEY, date)
}

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

function isNew (event, date) {
  return date && new Date(event.insertedAt).getTime() > date.getTime()
}

const NotificationsFeed = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [activeTab, setTab] = useState(TABS[0])
  const [events, setEvents] = useState([])
  const [canLoad, setCanLoad] = useState(true)
  const [lastLoadedDate, setLastViewedDate] = useState(LAST_UPDATES_DATE)

  const { data: { events: chunk } = {}, loading, error } = useTimelineEvents({
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

  function loadMore () {
    if (!loading && canLoad && !error) {
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

  function onClose () {
    const first = events[0]

    if (first) {
      saveLastLoadedToLS(first.insertedAt)
      setLastViewedDate(new Date(first.insertedAt))
    }
  }

  const hasNew = useMemo(
    () => {
      return (
        (!lastLoadedDate && events.length !== 0) ||
        events.some(item => isNew(item, lastLoadedDate))
      )
    },
    [events, lastLoadedDate]
  )

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        onClose={onClose}
        align='end'
        offsetY={32}
        offsetX={24}
        className={styles.dropdown}
        trigger={
          <div className={cx(styles.trigger, hasNew && styles.trigger__active)}>
            <Icon type='bell' className={styles.icon} />
          </div>
        }
      >
        <PanelWithHeader
          className={styles.panel}
          headerClassName={styles.header}
          contentClassName={styles.panelContent}
          header={
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
          }
        >
          <NotificationTypes onChange={onChangeType} selected={settings.type} />

          <div className={styles.content}>
            <div className={styles.scroller}>
              <div className={cx(styles.list, loading && styles.list__loading)}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={!loading && canLoad}
                  threshold={200}
                  useWindow={false}
                >
                  {events.map(item => (
                    <NotificationItem
                      data={item}
                      key={item.id}
                      className={styles.item}
                      isNew={
                        hasNew &&
                        (!lastLoadedDate || isNew(item, lastLoadedDate))
                      }
                    />
                  ))}
                  {loading && (
                    <Skeleton
                      show={loading}
                      key='loader'
                      className={styles.skeleton}
                    />
                  )}
                </InfiniteScroll>
              </div>

              {!loading &&
                events.length === 0 &&
                (settings.type === 'ALL' ? (
                  <NoNotitications />
                ) : (
                  <NoNotiticationsForTag />
                ))}
            </div>
          </div>
        </PanelWithHeader>
      </ContextMenu>
    </div>
  )
}

export default NotificationsFeed
