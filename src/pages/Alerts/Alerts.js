import React, { useCallback, useState } from 'react'
import Loadable from 'react-loadable'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import cx from 'classnames'
import withSizes from 'react-sizes'
import AlertsFilter, { filters } from './AlertsFilter/AlertsFilter'
import IndexTab from '../../components/IndexTabs/IndexTab'
import PageLoader from '../../components/Loader/PageLoader'
import { MobileOnly } from '../../components/Responsive'
import { RecommendedSignals } from '../SonarFeed/SonarFeedRecommendations'
import AlertModal from '../../ducks/Alert/AlertModal'
import { useSignals } from '../../ducks/Signals/common/getSignals'
import { useUser } from '../../stores/user'
import { mapSizesToProps } from '../../utils/withSizes'
import { prepareAlertTitle } from '../../ducks/Signals/link/OpenSignalLink'
import styles from './Alerts.module.scss'

const LoadableAlertsList = Loadable({
  loader: () => import('../SonarFeed/SignalsList'),
  loading: () => <PageLoader />
})

const Alerts = ({ isDesktop, match }) => {
  const [filter, setFilter] = useState(filters.ALL)
  const { user, loading: isUserLoading } = useUser()
  const { tab } = parse(useLocation().search, { parseNumbers: true })
  const { data: signals = [], loading } = useSignals({
    skip: user && !user.id
  })
  const defaultOpenAlertId = match.params.id

  const initialTab = tab || (signals && signals.length > 0 ? 1 : 0)

  const handleChangeFilter = res => {
    setFilter(res)
  }

  const bottomActions = [
    {
      id: 0,
      component: AlertsFilter,
      showOnTabs: ['My Alerts'],
      hide: !isDesktop,
      props: {
        onSelect: handleChangeFilter,
        selectedFilter: filter
      }
    },
    {
      id: 1,
      component: AlertModal,
      props: {
        canRedirect: false,
        buttonParams: {
          classes: styles.createButton
        }
      }
    }
  ]

  const renderTopActions = useCallback(
    currentTab => {
      return (
        <MobileOnly>
          <div className={styles.header}>
            <div className={styles.title}>Alerts</div>
            {currentTab === 1 && (
              <AlertsFilter
                onSelect={handleChangeFilter}
                selectedFilter={filter}
              />
            )}
          </div>
        </MobileOnly>
      )
    },
    [filter]
  )

  return (
    <div className={cx('page')}>
      {loading || isUserLoading ? (
        <PageLoader />
      ) : (
        <div className={styles.container}>
          <IndexTab
            key={tab}
            initialTab={initialTab}
            tabs={[
              {
                id: 0,
                title: 'Explore Alerts',
                content: (
                  <RecommendedSignals
                    userId={user ? user.id : ''}
                    showTitle={false}
                    showNew
                  />
                )
              },
              {
                id: 1,
                title: 'My Alerts',
                content: (
                  <LoadableAlertsList
                    userId={user ? user.id : ''}
                    showNew
                    filters={{
                      statusFilter: filter
                    }}
                  />
                )
              }
            ]}
            bottomActions={bottomActions}
            renderTopActions={renderTopActions}
          />
          {defaultOpenAlertId && (
            <AlertModal
              id={defaultOpenAlertId}
              defaultOpen={true}
              canRedirect={false}
              trigger={<></>}
              prepareAlertTitle={prepareAlertTitle}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default withSizes(mapSizesToProps)(Alerts)
