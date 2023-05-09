import React, { useEffect, useRef } from 'react';
import SubscriptionSettings from './SettingsSubscription.svelte';

const SettingsSubscription = () => {
  const ref = useRef();
  useEffect(() => {
    const svelte = new SubscriptionSettings({
      target: ref.current
    });
    return () => svelte.$destroy();
  }, [ref]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "mrg-xl mrg--b"
  });
};

export default SettingsSubscription;