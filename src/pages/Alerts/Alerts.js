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
import MyAlertsTab from './MyAlertsTab/MyAlertsTab'
import AlertRestrictionMessage from './AlertRestrictionMessage/AlertRestrictionMessage'
import { useSignals } from '../../ducks/Signals/common/getSignals'
import { useUser } from '../../stores/user'
import { mapSizesToProps } from '../../utils/withSizes'
import { prepareAlertTitle } from '../../ducks/Signals/link/OpenSignalLink'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './Alerts.module.scss'

const LoadableAlertsList = Loadable({
  loader: () => import('../SonarFeed/SignalsList'),
  loading: () => <PageLoader />,
})

function getAlertsRestrictions ({ signals, isPro, isProPlus }) {
  const maxAmount = isProPlus ? Infinity : isPro ? 20 : 3
  return {
    maxAmount,
    currentAmount: signals.length,
    shouldHideRestrictionMessage: isProPlus || signals.length !== maxAmount,
  }
}

const Alerts = ({ isDesktop, match }) => {
  const [filter, setFilter] = useState(filters.ALL)
  const { user, loading: isUserLoading } = useUser()
  const { tab } = parse(useLocation().search, { parseNumbers: true })
  const { data: signals = [], loading } = useSignals({
    skip: user && !user.id,
  })
  const { isPro, isProPlus } = useUserSubscriptionStatus()
  const alertsRestrictions = getAlertsRestrictions({
    signals,
    isPro,
    isProPlus,
  })
  const { shouldHideRestrictionMessage } = alertsRestrictions
  const defaultOpenAlertId = match.params.id

  const initialTab = tab || (signals && signals.length > 0 ? 1 : 0)

  const handleChangeFilter = (res) => {
    setFilter(res)
  }

  const bottomActions = [
    {
      id: 0,
      component: AlertsFilter,
      showOnTabs: [1],
      hide: !isDesktop,
      props: {
        onSelect: handleChangeFilter,
        selectedFilter: filter,
      },
    },
    {
      id: 1,
      component: AlertModal,
      props: {
        disabled: !shouldHideRestrictionMessage,
        canRedirect: false,
        triggerButtonProps: {
          label: 'Create alert',
          variant: 'fill',
          border: false,
          classes: 'mrg-l mrg--l',
        },
      },
    },
  ]

  const renderTopActions = useCallback(
    (currentTab) => {
      return (
        <MobileOnly>
          <div className={styles.header}>
            <div className={styles.title}>Alerts</div>
            {currentTab === 1 && (
              <AlertsFilter onSelect={handleChangeFilter} selectedFilter={filter} />
            )}
          </div>
        </MobileOnly>
      )
    },
    [filter],
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
                    shouldDisableActions={!shouldHideRestrictionMessage}
                  />
                ),
              },
              {
                id: 1,
                title: <MyAlertsTab alertsRestrictions={alertsRestrictions} />,
                content: (
                  <>
                    <AlertRestrictionMessage
                      shouldHideRestrictionMessage={shouldHideRestrictionMessage}
                    />
                    <LoadableAlertsList
                      userId={user ? user.id : ''}
                      showNew
                      filters={{
                        statusFilter: filter,
                      }}
                    />
                  </>
                ),
              },
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
