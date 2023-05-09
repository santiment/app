import React, { useCallback, useState } from 'react';
import Loadable from 'react-loadable';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import cx from 'classnames';
import withSizes from 'react-sizes';
import AlertsFilter, { filters } from './AlertsFilter/AlertsFilter';
import IndexTab from '../../components/IndexTabs/IndexTab';
import TipPopup from '../../components/EmptySection/Tip/TipPopup';
import PageLoader from '../../components/Loader/PageLoader';
import { MobileOnly } from '../../components/Responsive';
import { RecommendedSignals } from '../SonarFeed/SonarFeedRecommendations';
import Page from '../../ducks/Page';
import AlertModal from '../../ducks/Alert/AlertModal';
import MyAlertsTab from './MyAlertsTab/MyAlertsTab';
import MobileTabs from './MobileTabs/MobileTabs';
import AlertRestrictionMessage from './AlertRestrictionMessage/AlertRestrictionMessage';
import { useSignals } from '../../ducks/Signals/common/getSignals';
import { useUser } from '../../stores/user';
import { mapSizesToProps } from '../../utils/withSizes';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import styles from './Alerts.module.css';
const LoadableAlertsList = Loadable({
  loader: () => import('../SonarFeed/SignalsList'),
  loading: () => /*#__PURE__*/React.createElement(PageLoader, null)
});

function getAlertsRestrictions({
  signals,
  isPro,
  isProPlus
}) {
  const maxAmount = isProPlus ? Infinity : isPro ? 20 : 3;
  return {
    maxAmount,
    currentAmount: signals.length,
    shouldHideRestrictionMessage: isProPlus || signals.length < maxAmount
  };
}

const Alerts = ({
  isDesktop,
  match
}) => {
  const [filter, setFilter] = useState(filters.ALL);
  const [isRestrictedMessageClosed, setIsRestrictedMessageClosed] = useState(false);
  const {
    user,
    loading: isUserLoading
  } = useUser();
  const {
    tab
  } = parse(useLocation().search, {
    parseNumbers: true
  });
  const {
    data: signals = [],
    loading
  } = useSignals({
    skip: user && !user.id
  });
  const {
    isPro,
    isProPlus
  } = useUserSubscriptionStatus();
  const alertsRestrictions = getAlertsRestrictions({
    signals,
    isPro,
    isProPlus
  });
  const {
    shouldHideRestrictionMessage
  } = alertsRestrictions;
  const defaultOpenAlertId = match.params.id;
  const initialTab = tab || (signals && signals.length > 0 ? 1 : 0);

  const handleChangeFilter = res => {
    setFilter(res);
  };

  const bottomActions = [{
    id: 0,
    component: AlertsFilter,
    showOnTabs: [1],
    hide: !isDesktop,
    props: {
      onSelect: handleChangeFilter,
      selectedFilter: filter
    }
  }, {
    id: 1,
    component: AlertModal,
    props: {
      disabled: !shouldHideRestrictionMessage,
      canRedirect: false,
      triggerButtonProps: {
        label: 'Create alert',
        variant: 'fill',
        border: false,
        classes: 'mrg-l mrg--l'
      }
    }
  }];
  const renderTopActions = useCallback(currentTab => {
    return /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("div", {
      className: styles.header
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, "Alerts"), currentTab === 1 && /*#__PURE__*/React.createElement(AlertsFilter, {
      onSelect: handleChangeFilter,
      selectedFilter: filter
    })));
  }, [filter]);

  if (!isDesktop) {
    return /*#__PURE__*/React.createElement(Page, {
      title: "Alerts",
      mainClassName: "relative"
    }, loading || isUserLoading ? /*#__PURE__*/React.createElement(PageLoader, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TipPopup, null), /*#__PURE__*/React.createElement(MobileTabs, {
      alertsRestrictions: alertsRestrictions,
      filter: /*#__PURE__*/React.createElement(AlertsFilter, {
        onSelect: handleChangeFilter,
        selectedFilter: filter,
        isMobile: true
      }),
      explore: /*#__PURE__*/React.createElement(RecommendedSignals, {
        userId: user ? user.id : '',
        showTitle: false,
        showNew: true,
        shouldDisableActions: !shouldHideRestrictionMessage
      }),
      myAlerts: /*#__PURE__*/React.createElement(LoadableAlertsList, {
        userId: user ? user.id : '',
        showNew: true,
        filters: {
          statusFilter: filter
        }
      })
    })), defaultOpenAlertId && /*#__PURE__*/React.createElement(AlertModal, {
      id: defaultOpenAlertId,
      isMobile: true,
      defaultOpen: true,
      canRedirect: false,
      trigger: /*#__PURE__*/React.createElement(React.Fragment, null)
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx('page')
  }, loading || isUserLoading ? /*#__PURE__*/React.createElement(PageLoader, null) : /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(IndexTab, {
    key: tab,
    initialTab: initialTab,
    tabs: [{
      id: 0,
      title: 'Explore Alerts',
      content: /*#__PURE__*/React.createElement(RecommendedSignals, {
        userId: user ? user.id : '',
        showTitle: false,
        showNew: true,
        shouldDisableActions: !shouldHideRestrictionMessage
      })
    }, {
      id: 1,
      title: /*#__PURE__*/React.createElement(MyAlertsTab, {
        alertsRestrictions: alertsRestrictions
      }),
      content: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AlertRestrictionMessage, {
        shouldHideRestrictionMessage: shouldHideRestrictionMessage,
        isRestrictedMessageClosed: isRestrictedMessageClosed,
        setIsRestrictedMessageClosed: setIsRestrictedMessageClosed
      }), /*#__PURE__*/React.createElement(LoadableAlertsList, {
        userId: user ? user.id : '',
        showNew: true,
        filters: {
          statusFilter: filter
        }
      }))
    }],
    bottomActions: bottomActions,
    renderTopActions: renderTopActions
  }), defaultOpenAlertId && /*#__PURE__*/React.createElement(AlertModal, {
    id: defaultOpenAlertId,
    defaultOpen: true,
    canRedirect: false,
    trigger: /*#__PURE__*/React.createElement(React.Fragment, null)
  })));
};

export default withSizes(mapSizesToProps)(Alerts);