import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { stringify } from 'query-string';
import { selectedLayout } from 'studio/stores/layout';
import { updateShortUrl, buildChartShortPath } from './utils';
import { useStore } from './stores';
import { shareWidgets, shareSettings } from './sharing/share';
import { useUser } from '../../stores/user';
import { getShortUrl } from '../../components/Share/utils';

const checkIsNotAuthorError = ({
  message
}) => message.includes('another user');

function getSharedUrl(shortUrlHash, settings, widgets, sidewidget, layout) {
  const path = shortUrlHash ? '/charts' : window.location.pathname;
  return path + '?' + stringify({
    settings,
    widgets,
    sidepanel: sidewidget ? JSON.stringify({
      type: sidewidget.key || sidewidget
    }) : undefined,
    layout: layout ? layout.id : undefined
  });
}

const getSharedSettings = settings => JSON.stringify(shareSettings(settings));

const getSharedWidgets = widgets => JSON.stringify(shareWidgets(widgets));

const unsub = unsubscribe => unsubscribe();

const URLExtension = ({
  history,
  settings,
  widgets,
  sidewidget,
  subwidgets,
  prevFullUrlRef,
  shortUrlHashState,
  setSlug
}) => {
  const {
    name
  } = settings;
  const [sharedWidgets, setSharedWidgets] = useState('');
  const {
    isLoggedIn
  } = useUser();
  const layout = useStore(selectedLayout);
  const sharedSettings = useMemo(() => getSharedSettings(settings), [settings]);
  useEffect(() => setSlug(settings.slug), [settings.slug]);
  useEffect(() => {
    const update = () => setSharedWidgets(getSharedWidgets(widgets));

    let updateTimer;

    function scheduleUpdate() {
      window.clearTimeout(updateTimer);
      updateTimer = window.setTimeout(update, 250);
    }

    const unsubs = [];
    widgets.forEach(widget => {
      if (!widget.OnUpdate) return;
      unsubs.push(widget.OnUpdate.subscribe(scheduleUpdate));
    });
    return () => {
      window.clearTimeout(updateTimer);
      unsubs.forEach(unsub);
    };
  }, [widgets, subwidgets]);
  useEffect(() => {
    if (!sharedSettings || !sharedWidgets) return;
    const isNew = window.location.pathname.split('/')[2] === 'new';
    let [shortUrlHash, setShortUrlHash] = shortUrlHashState;
    const url = getSharedUrl(shortUrlHash, sharedSettings, sharedWidgets, sidewidget, layout);
    if (url === prevFullUrlRef.current) return;

    if (isNew && window.onLayoutCreationOpen) {
      window.onLayoutCreationOpen();
    }

    prevFullUrlRef.current = url;

    if (!isLoggedIn) {
      return history.replace(url);
    }

    let isRacing = false;
    mutateShortUrl();

    function mutateShortUrl() {
      const shortUrlPromise = shortUrlHash ? updateShortUrl(shortUrlHash, url) : getShortUrl(url).then(newShortUrlHash => {
        if (isRacing) return;
        shortUrlHash = newShortUrlHash;
        setShortUrlHash(newShortUrlHash);
        history.push(buildChartShortPath(shortUrlHash));
      });
      shortUrlPromise.then(() => {
        if (isRacing) return;
        history.replace(buildChartShortPath(shortUrlHash));
        window.onChartsLayoutMount();
      }).catch(error => {
        if (isRacing) return;

        if (checkIsNotAuthorError(error)) {
          shortUrlHash = undefined;
          return mutateShortUrl();
        }

        history.replace(url); // onShortUrlUpdateError()
      });
    }

    return () => isRacing = true;
  }, [sharedSettings, sharedWidgets, sidewidget, layout]);
  return /*#__PURE__*/React.createElement(Helmet, {
    meta: [{
      property: 'og:title',
      content: `Project overview: ${name} - Sanbase`
    }, {
      property: 'og:description',
      content: `Financial, development, on-chain and social data for ${name}.`
    }]
  });
};

export default withRouter(URLExtension);