import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import InfiniteScroll from 'react-infinite-scroller'
import Icon from '@santiment-network/ui/Icon'
import Tabs from '@santiment-network/ui/Tabs'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { useTimelineEvents } from './hooks'
import NotificationItem from '../NotificationItem/NotificationItem'
import NotificationTypes from '../NotificationTypes/NotificationTypes'
import NoNotitications from '../NoNotitications/NoNotitications'
import { useUser } from '../../../stores/user'
import { MAX_TIMELINE_EVENTS_LIMIT } from '../../../pages/feed/GeneralFeed/utils'
import { useDialogState } from '../../../hooks/dialog'
import styles from './NotificationsFeed.module.scss'

const LAST_UPDATES_KEY = 'NOTIFICATIONS__LAST_UPDATES_KEY'
const NOW = 'utc_now'
const getLastUpdated = () =>
  localStorage.getItem(LAST_UPDATES_KEY)
    ? new Date(localStorage.getItem(LAST_UPDATES_KEY))
    : undefined

const saveLastLoadedToLS = (date) => {
  localStorage.setItem(LAST_UPDATES_KEY, date)
}

const DEFAULT_SETTINGS = {
  date: NOW,
  type: 'ALL',
  author: 'ALL',
}

const LOGGED_IN_TABS = ['All notifications', 'Following']
const ANON_TABS = ['All notifications']
const TABS_TO_FILTER_AUTHORS = {
  'All notifications': 'ALL',
  Following: 'FOLLOWED',
}

function isNew(event, date) {
  return date && new Date(event.insertedAt).getTime() > date.getTime()
}

function setToLsFirst(events) {
  const first = events[0]

  if (first) {
    const currentValue = getLastUpdated()

    if (!currentValue || currentValue.getTime() < new Date(first.insertedAt).getTime()) {
      saveLastLoadedToLS(first.insertedAt)
    }
  }

  return first
}

const NotificationsFeed = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const { openDialog, closeDialog, isOpened } = useDialogState()
  const { isLoggedIn } = useUser()

  const tabs = useMemo(() => (isLoggedIn ? LOGGED_IN_TABS : ANON_TABS), [isLoggedIn])

  const [activeTab, setTab] = useState(tabs[0])
  const [events, setEvents] = useState([])
  const [canLoad, setCanLoad] = useState(true)
  const [lastLoadedDate, setLastViewedDate] = useState(getLastUpdated)

  const {
    data: { events: chunk } = {},
    loading,
    error,
  } = useTimelineEvents({
    to: settings.date,
    type: settings.type,
    author: settings.author,
  })

  useEffect(() => {
    if (!loading) {
      if (chunk && chunk.length > 0) {
        setEvents([...events, ...chunk])
      }

      setCanLoad(chunk && chunk.length > 0)
    } else {
      setCanLoad(false)
    }
  }, [chunk, loading])

  useEffect(() => {
    isOpened && setToLsFirst(events)
  }, [events, isOpened])

  function loadMore() {
    if (!loading && canLoad && !error) {
      const last = events[events.length - 1]
      const targetDate =
        last && settings.date !== last.insertedAt
          ? new Date(new Date(last.insertedAt).getTime() - 1000)
          : NOW

      const newSettings = {
        ...settings,
        date: targetDate,
      }
      if (!isEqual(settings, newSettings)) {
        setSettings(newSettings)
      }
    }
  }

  function updateSettings(props) {
    setEvents([])
    setSettings({
      ...settings,
      date: NOW,
      ...props,
    })
  }

  function onChangeType(type) {
    updateSettings({
      type,
    })
  }

  function onClose() {
    const event = setToLsFirst(events)

    if (event) {
      setLastViewedDate(new Date(event.insertedAt))
    }

    closeDialog()
  }

  const hasNew = useMemo(() => {
    return (
      (!lastLoadedDate && events.length !== 0) || events.some((item) => isNew(item, lastLoadedDate))
    )
  }, [events, lastLoadedDate])

  const newCount = useMemo(() => {
    let count = events.filter((item) => isNew(item, lastLoadedDate)).length
    if (count > 9) {
      count = '9+'
    }
    return count
  }, [events, lastLoadedDate])

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        onClose={onClose}
        onOpen={openDialog}
        open={isOpened}
        align='end'
        offsetY={18}
        className={styles.dropdown}
        trigger={
          <div className={cx(styles.trigger, 'relative')}>
            {hasNew && (
              <div className={cx(styles.counter, 'caption txt-center txt-m')}>{newCount}</div>
            )}
            <Icon type='bell' className={cx(styles.icon, 'btn-ghost')} />
          </div>
        }
      >
        <PanelWithHeader
          className={styles.panel}
          headerClassName={styles.header}
          contentClassName={styles.panelContent}
          header={
            <Tabs
              className={cx(styles.tabs, tabs.length === 1 && styles.tabs__one)}
              options={tabs}
              defaultSelectedIndex={activeTab}
              onSelect={(tab) => {
                setTab(tab)
                updateSettings({
                  author: TABS_TO_FILTER_AUTHORS[tab],
                })
              }}
              classes={styles}
            />
          }
        >
          <NotificationTypes onChange={onChangeType} selected={settings.type} />

          <div className={styles.content}>
            <div className={styles.scroller}>
              {events.length > 0 && (
                <div
                  className={cx(styles.list, (events.length < 5 || loading) && styles.list__strict)}
                >
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={!loading && canLoad}
                    threshold={200}
                    useWindow={false}
                  >
                    {events.map((item, index) => (
                      <NotificationItem
                        data={item}
                        key={item.id}
                        isOpened={isOpened}
                        className={styles.item}
                        closeDropdown={onClose}
                        timeoutIndex={index % MAX_TIMELINE_EVENTS_LIMIT}
                        isNew={hasNew && (!lastLoadedDate || isNew(item, lastLoadedDate))}
                      />
                    ))}
                    <Skeleton
                      repeat={5}
                      show={loading && canLoad}
                      key='loader'
                      className={styles.skeleton}
                      wrapperClassName={styles.skeletonWrapper}
                    />
                  </InfiniteScroll>
                </div>
              )}

              {!loading && events.length === 0 && <Warning settings={settings} />}
            </div>
          </div>
        </PanelWithHeader>
      </ContextMenu>
    </div>
  )
}

const Warning = ({ settings }) => {
  return settings.type === 'ALL' ? (
    <NoNotitications description='Your new messages will appear here' showSvg />
  ) : (
    <NoNotitications description='There’s no activity for this tag, please select another one' />
  )
}

export default NotificationsFeed
