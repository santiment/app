import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import useGoogleOptimize from '@react-hook/google-optimize';
import { AccountStatusType } from 'san-webkit/lib/ui/AccountStatus.svelte';
import Navbar from './Navbar.svelte';
import Search from './Search';
import NotificationsFeed from '../../ducks/Notifications/NotificationsFeed/NotificationsFeed';
import { useUser } from '../../stores/user';
import { useUserSubscriptions } from '../../stores/user/subscriptions';
import { APP_STATES } from '../../ducks/Updates/reducers';
import { NAVBAR_EXPERIMENT_ID } from '../../utils/tracking';
export default (({
  pathname
}) => {
  const [svelte, setSvelte] = useState();
  const [searchNode, setSearchNode] = useState();
  const [notificationsNode, setNotificationsNode] = useState();
  const ref = useRef();
  const {
    user
  } = useUser();
  const {
    subscriptions
  } = useUserSubscriptions();
  const currentUser = useMemo(() => {
    if (user) user.subscriptions = subscriptions || [];
    return user;
  }, [user, subscriptions]);
  const variant = useGoogleOptimize(NAVBAR_EXPERIMENT_ID, [AccountStatusType.First, AccountStatusType.Second]) || AccountStatusType.First;
  const appVersionState = useSelector(state => state.app.appVersionState);
  const isAppUpdateAvailable = appVersionState === APP_STATES.NEW_AVAILABLE;
  useEffect(() => {
    const svelte = new Navbar({
      target: ref.current,
      props: {
        pathname,
        currentUser,
        mount: onMount,
        isAppUpdateAvailable,
        variant
      }
    });
    setSvelte(svelte);
    return () => svelte.$destroy();
  }, []);
  useEffect(() => {
    if (!svelte) return;
    svelte.$set({
      pathname,
      currentUser,
      isAppUpdateAvailable,
      variant
    });
  }, [pathname, currentUser, subscriptions, variant, isAppUpdateAvailable]);

  function onMount(searchNode, notificationsNode) {
    setSearchNode(searchNode);
    setNotificationsNode(notificationsNode);
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "header"
  }, searchNode && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(Search, null), searchNode), notificationsNode && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(NotificationsFeed, null), notificationsNode));
});