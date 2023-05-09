function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useState, useEffect } from 'react';
import { get } from 'svelte/store';
import { CONTEXT as HISTORY_CONTEXT } from 'webkit/ui/history';
import { globals } from 'studio/stores/globals';
import { studio, LOCKED_ASSET_CONTEXT } from 'studio/stores/studio';
import { useUser } from '../../stores/user';
import { useIsBetaMode } from '../../stores/ui';
import { useTheme } from '../../stores/ui/theme';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
export const getSvelteContext = (cmp, ctx) => cmp && cmp.$$.context.get(ctx);
export function useStore(store, immute = _ => _, setStoreRef) {
  const [state, setState] = useState(() => store ? get(store) : []);
  if (setStoreRef) setStoreRef.current = setState;
  useEffect(() => store && store.subscribe(value => {
    setState(immute(value));
  }), [store]);
  return state;
}
export function useGlobalsUpdater() {
  const {
    isNightMode
  } = useTheme();
  const {
    isLoggedIn
  } = useUser();
  const userInfo = useUserSubscriptionStatus();
  const isBeta = useIsBetaMode();
  useEffect(() => {
    globals.toggle('isNightMode', isNightMode);
    globals.toggle('isLoggedIn', isLoggedIn);
    globals.toggle('isTrial', userInfo.isTrial);
    globals.toggle('isPro', userInfo.isPro);
    globals.toggle('isProPlus', userInfo.isProPlus);
    globals.toggle('isBeta', isBeta);
  }, [userInfo, isLoggedIn, isNightMode, isBeta]);
}

const settingsImmute = store => _extends({}, store);

export const useSettings = () => useStore(studio, settingsImmute);
export const useLockedAssetStore = studio => getSvelteContext(studio, LOCKED_ASSET_CONTEXT);
export const useLockedAsset = LockedAssetStore => useStore(LockedAssetStore, settingsImmute);

const widgetsImmute = store => store.slice();

export const useWidgetsStore = studio => getSvelteContext(studio, 'widgets');
export const useWidgets = (studio, setWidgetsRef) => useStore(useWidgetsStore(studio), widgetsImmute, setWidgetsRef) || [];

const flat = array => array.flat ? array.flat() : array.reduce((acc, val) => acc.concat(val), []);

const noop = () => {};

export function useStudioMetrics(studio) {
  const widgets = useWidgets(studio);
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    const unsubs = new Array(widgets.length);
    const WidgetMetric = {};
    widgets.forEach((widget, i) => {
      if (!widget.Metrics) return unsubs[i] = noop;
      unsubs[i] = widget.Metrics.subscribe(metrics => {
        WidgetMetric[widget.id] = metrics;
        updateMetrics();
      });
    });

    function updateMetrics() {
      const metrics = flat(Object.values(WidgetMetric));
      setMetrics(Array.from(new Set(metrics)));
    }

    const unsubscribe = unsub => unsub();

    return () => unsubs.forEach(unsubscribe);
  }, [widgets]);
  return metrics;
}
export const useHistory = studio => getSvelteContext(studio, HISTORY_CONTEXT);