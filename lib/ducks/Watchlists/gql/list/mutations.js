function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as Sentry from '@sentry/react';
import { track } from 'webkit/analytics';
import { client } from '../../../../apollo';
import { useMutation } from '@apollo/react-hooks';
import { history } from '../../../../redux';
import { getWatchlistLink } from '../../url';
import { stringifyFn } from '../../../Screener/utils';
import { normalizeItems, transformToServerType } from '../helpers';
import { updateWatchlistsOnCreation, updateWatchlistOnEdit, updateWatchlistsOnDelete } from '../cache';
import { BLOCKCHAIN_ADDRESS, detectWatchlistType, getTitleByWatchlistType, PROJECT, SCREENER } from '../../detector';
import { notifyCreation, notifyDeletion, notifyError } from '../../Widgets/TopPanel/notifications';
import { getMutationByAction } from './helpers';
import { CREATE_WATCHLIST_MUTATION, REMOVE_WATCHLIST_MUTATION, UPDATE_WATCHLIST_MUTATION } from './queries';
export function useUpdateWatchlist(type) {
  const [mutate, data] = useMutation(UPDATE_WATCHLIST_MUTATION(type), {
    update: updateWatchlistOnEdit
  });

  function updateWatchlist(watchlist, newParams) {
    const {
      id,
      name,
      function: oldFn
    } = watchlist;
    const description = newParams.description === undefined ? watchlist.description : newParams.description;
    const isPublic = newParams.isPublic === undefined ? watchlist.isPublic : newParams.isPublic;
    const isMonitored = newParams.isMonitored === undefined ? watchlist.isMonitored : newParams.isMonitored;
    let listItems = [];

    if (type === PROJECT) {
      if (newParams.listItems) {
        listItems = newParams.listItems;
      } else {
        listItems = watchlist.listItems;
      }

      listItems = listItems.map(item => ({
        projectId: item.project ? +item.project.id : +item.projectId
      }));
    }

    return mutate({
      variables: {
        id: +id,
        isPublic,
        isMonitored,
        description,
        listItems,
        name: newParams.name || name,
        function: stringifyFn(newParams.function || oldFn)
      }
    }).then(({
      data
    }) => _objectSpread(_objectSpread({}, watchlist), data.updateWatchlist)).catch(err => {
      const type = detectWatchlistType(watchlist);
      Sentry.captureException(err);
      notifyError(getTitleByWatchlistType(type), 'update');
    });
  }

  return [updateWatchlist, data];
}
export const updateWatchlistShort = (variables, action) => client.mutate({
  mutation: getMutationByAction(action),
  update: updateWatchlistOnEdit,
  variables: _objectSpread(_objectSpread({}, variables), {}, {
    listItems: normalizeItems(variables.listItems, BLOCKCHAIN_ADDRESS)
  })
});

function trackWatchlistCreation(type, watchlist, trackInfo) {
  const {
    id,
    name,
    description,
    isPublic
  } = watchlist;
  const {
    source,
    infographics: sourceInfographics = {}
  } = trackInfo || {};
  const {
    isMovement,
    isPriceChartActive,
    isPriceTreeMap,
    isVolumeTreeMap
  } = sourceInfographics;
  const infographics = [isPriceTreeMap && 'price_treemap', isVolumeTreeMap && 'social_volume_treemap', isPriceChartActive && 'price_bar_chart', isMovement && 'marketcap_volume'].filter(Boolean);
  const isScreener = type === SCREENER;
  const event = isScreener ? 'screener_create' : 'watchlist_create';
  track.event(event, {
    category: 'General',
    id,
    type: isScreener || type === 'PROJECT' ? 'project' : 'address',
    is_public: isPublic,
    title: name,
    description,
    infographics,
    source,
    source_url: window.location.href
  });
}

export function useCreateWatchlist(type) {
  const [mutate, data] = useMutation(CREATE_WATCHLIST_MUTATION(type), {
    update: updateWatchlistsOnCreation
  });

  function createWatchlist(props, trackInfo) {
    const {
      function: fn,
      listItems,
      name,
      description,
      isPublic
    } = props;
    return mutate({
      variables: {
        type: transformToServerType(type),
        name,
        isPublic,
        description,
        isScreener: type === SCREENER,
        function: type === SCREENER ? stringifyFn(fn) : undefined,
        listItems: normalizeItems(listItems, type)
      }
    }).then(({
      data: {
        watchlist
      }
    }) => {
      const link = getWatchlistLink(watchlist);
      const title = getTitleByWatchlistType(type);
      const {
        openOnSuccess
      } = props;
      notifyCreation(title, !openOnSuccess && link);
      trackWatchlistCreation(type, _objectSpread(_objectSpread({}, props), {}, {
        id: watchlist.id
      }), trackInfo);

      if (openOnSuccess) {
        history.push(link);
      }

      return watchlist;
    }).catch(err => {
      Sentry.captureException(err);
      notifyError(getTitleByWatchlistType(type), 'create');
    });
  }

  return [createWatchlist, data];
}
export function useRemoveWatchlist(type) {
  const [mutate, data] = useMutation(REMOVE_WATCHLIST_MUTATION, {
    update: updateWatchlistsOnDelete
  });

  function onDelete(id, name) {
    return mutate({
      variables: {
        id: +id
      }
    }).then(() => notifyDeletion(name)).catch(err => {
      Sentry.captureException(err);
      notifyError(getTitleByWatchlistType(type), 'delete');
    });
  }

  return {
    onDelete,
    data
  };
}
export const useCreateProjectWatchlist = () => useCreateWatchlist(PROJECT);
export const useCreateScreener = () => useCreateWatchlist(SCREENER);
export const useCreateAddressesWatchlist = () => useCreateWatchlist(BLOCKCHAIN_ADDRESS);