const _excluded = ["top", "bottom", "boundingClientRect"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useCallback, useEffect, useMemo, useState } from 'react';
import throttle from 'lodash.throttle';
import { useQuery } from '@apollo/react-hooks';
import { useEventListener } from '../../hooks/eventListeners';
import { METRIC_BOUNDARIES_QUERY } from './queries';
import { DASHBOARDS } from './constants';

function closestToZero(numbers) {
  let closestIndex = 0;
  let diff = Number.MAX_VALUE;

  for (let i = 0; i < numbers.length; i++) {
    const odd = numbers[i].odd;
    let abs = Math.abs(odd);

    if (abs < diff) {
      closestIndex = i;
      diff = abs;
    } else if (abs === diff && odd > 0 && numbers[closestIndex] < 0) {
      closestIndex = i;
    }
  }

  return numbers[closestIndex];
}

export const useNav = ({
  match,
  location,
  history
}) => {
  const [activeItem, setActiveItem] = useState(undefined);
  const [activeSubItem, setActiveSubItem] = useState(undefined);
  const targets = useMemo(() => activeItem && activeItem.subItems ? collectSubItems(activeItem.subItems) : [], [activeItem, activeSubItem]);
  useEffect(() => {
    const currentPathname = location.pathname;
    const itemPath = currentPathname.split('/')[2];

    if (!activeItem) {
      const item = itemPath ? DASHBOARDS.find(({
        path
      }) => path === itemPath) : DASHBOARDS[0];
      if (item) setActiveItem(item);
    }

    return () => {};
  }, []);
  useEffect(() => {
    if (activeItem) {
      const currentPathname = location.pathname;
      const currentHash = location.hash;
      const url = `${match.path}/${activeItem.path}`;

      if (url !== currentPathname) {
        history.push(url);
      }

      const subItems = activeItem.subItems;

      if (subItems) {
        const currentSubItem = currentHash && subItems.find(({
          key
        }) => key === currentHash.replace('#', ''));

        if (currentSubItem) {
          const scrollPosition = getSubItemScrollPosition(currentSubItem);
          window.scrollTo({
            left: 0,
            top: scrollPosition,
            behavior: 'auto'
          });
          history.replace(`${window.location.pathname}${currentHash}`);
        }

        setActiveSubItem(currentSubItem || subItems[0]);
      } else {
        setActiveSubItem(undefined);
      }
    }
  }, [activeItem]);
  useEffect(() => {
    if (activeSubItem) {
      history.replace(`${window.location.pathname}#${activeSubItem.key}`);
    }
  }, [activeSubItem]);
  const handleObserve = useCallback(() => {
    if (targets.length > 0) {
      const maxEntry = findMaxEntry(targets);
      const subItems = activeItem.subItems;
      const targetSubItem = maxEntry && subItems.find(({
        key
      }) => key === maxEntry.target.id);
      if (targetSubItem && targetSubItem.key !== activeSubItem.key) setActiveSubItem(targetSubItem);
    }
  }, [activeItem, activeSubItem, targets]);
  const throttledHandleObserve = throttle(handleObserve, 350);
  useEventListener('scroll', throttledHandleObserve);

  function getSubItemScrollPosition(subItem) {
    const itemAnchor = document.getElementById(subItem.key);
    return itemAnchor ? itemAnchor.offsetTop - window.innerHeight / 4 : 0;
  }

  function scrollToSubItem(subItem) {
    const scrollPosition = getSubItemScrollPosition(subItem);

    if (scrollPosition) {
      const subItems = activeItem.subItems;
      const isFirst = subItems[0].key === subItem.key;
      const isLast = subItems[subItems.length - 1].key === subItem.key;
      if (isFirst && !isLast) window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });else if (!isFirst && isLast) window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });else window.scrollTo({
        left: 0,
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  function collectSubItems(subItems) {
    return subItems.map(({
      key
    }) => document.getElementById(key));
  }

  function findMaxEntry(targets) {
    const isBottom = document.documentElement.scrollHeight === window.pageYOffset + window.innerHeight;
    const entries = targets.filter(Boolean).map(target => ({
      target,
      boundingClientRect: target.getBoundingClientRect()
    }));

    if (entries.length === activeItem.subItems.length) {
      const intersectingEntries = entries.map(({
        target,
        boundingClientRect
      }) => ({
        target,
        top: boundingClientRect.top,
        bottom: boundingClientRect.bottom,
        y: boundingClientRect.y,
        boundingClientRect
      }));
      const intersectionOdds = intersectingEntries.map((_ref, index) => {
        let {
          top,
          bottom,
          boundingClientRect
        } = _ref,
            rest = _objectWithoutProperties(_ref, _excluded);

        let odd = Math.abs(top - window.innerHeight / 4);
        if (index === 0) odd = Math.abs(top - 226);
        if (index === intersectingEntries.length - 1 && isBottom) odd = 0;
        return _objectSpread({
          odd
        }, rest);
      });
      return closestToZero(intersectionOdds);
    }

    return false;
  }

  return {
    activeItem,
    activeSubItem,
    setActiveItem,
    setActiveSubItem,
    scrollToSubItem
  };
};
export function useRestrictedInfo(variables) {
  const {
    data
  } = useQuery(METRIC_BOUNDARIES_QUERY, {
    variables
  });
  return data ? data.getMetric.metadata.isRestricted : false;
}