const _excluded = ["action", "category", "label"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useMutation } from '@apollo/react-hooks';
import { useUser } from '../stores/user';
import { TRACK_EVENTS_MUTATION } from '../queries/TrackingGQL';
import { isProdApp, isBrowser, hasDoNotTrack } from '../utils/tracking';
export function useTrackEvents() {
  const {
    isLoggedIn
  } = useUser();
  const [mutate] = useMutation(TRACK_EVENTS_MUTATION, {
    skip: !isLoggedIn
  });

  function trackEvent(_ref, service = ['ga', 'sanapi']) {
    let {
      action,
      category,
      label
    } = _ref,
        values = _objectWithoutProperties(_ref, _excluded);

    if (!isBrowser || !isProdApp || hasDoNotTrack()) {
      return null;
    }

    const created_at = new Date();

    if (service.includes('ga')) {
      window.gtag('event', action, _objectSpread({
        event_category: category,
        event_label: label
      }, values));
    }

    if (service.includes('intercom')) {
      window.Intercom('trackEvent', action, _objectSpread({
        event_category: category,
        event_label: label
      }, values));
    }

    if (service.includes('twitter')) {
      window.twq('track', action, _objectSpread({
        content_type: category,
        content_name: label
      }, values));
    }

    if (service.includes('sanapi')) {
      mutate({
        variables: {
          events: JSON.stringify([{
            event_name: action,
            metadata: _objectSpread({
              category,
              label
            }, values),
            created_at
          }])
        }
      }).catch(err => console.error(err));
    }
  }

  return [trackEvent];
}