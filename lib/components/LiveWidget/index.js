import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { checkIsHidden, CHANNEL_LINK, checkIsActive, hideWidget } from './utils';
import styles from './index.module.css';
const LONG_DELAY = 500000; // 5 min

const SHORT_DELAY = 5000; // 5 sec

const MAX_INIT_ATTEMPTS = 5;
let initCounter = 0;

const LiveWidget = () => {
  const [player, setPlayer] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoId, setVideoId] = useState(null); // videoUrl is always changing, videoId is permanent

  const [isShow, setIsShow] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(initPlayer, []);
  useEffect(() => {
    if (player !== null) {
      isLiveStreamExist();
    }
  }, [player]);
  useEffect(() => {
    let interval;
    let timer;
    if (isHidden || !player) return;

    if (isShow && isStarted || !isShow) {
      interval = setInterval(isLiveStreamExist, LONG_DELAY);
    }

    if (isShow && !isStarted) {
      timer = setTimeout(isLiveStreamExist, SHORT_DELAY);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isShow, isStarted, isHidden, player]);
  useEffect(() => {
    if (player !== null && isHidden) {
      player.destroy();
      setPlayer(null);
    }
  }, [isHidden]);
  useEffect(() => {
    if (isShow) {
      player.mute();
      player.playVideo();
      const {
        video_id
      } = player.getVideoData();
      setVideoUrl(player.getVideoUrl());
      setVideoId(video_id);
      setIsHidden(checkIsHidden(video_id));
    }
  }, [isShow]);

  function initPlayer() {
    if (initCounter >= MAX_INIT_ATTEMPTS) {
      Sentry.captureException("can't initialize youtube iframe api");
      return;
    }

    if ((typeof window.YT === 'undefined' || typeof window.YT.Player === 'undefined') && initCounter < MAX_INIT_ATTEMPTS) {
      initCounter++;
      setTimeout(initPlayer, SHORT_DELAY);
    } else {
      try {
        new window.YT.Player('live_stream', {
          events: {
            onReady: evt => setPlayer(evt.target)
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  const isLiveStreamExist = () => {
    if (!player) return;
    const {
      video_id,
      title
    } = player.getVideoData();
    const isAvailableStream = !!title && video_id !== 'live_stream';

    if (!isAvailableStream) {
      setIsShow(false);
      setIsStarted(false);
    } else {
      setIsShow(true);
      const isStarted = checkIsActive(player.getPlayerState());

      if (isStarted) {
        setIsStarted(true);
      }
    }
  };

  function onWidgetClick() {
    setIsHidden(true);
    hideWidget(videoId);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, isShow && isStarted && !isHidden && styles.wrapper__visible),
    onClick: onWidgetClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.close
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium"
  })), /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, "Join our Live weekly market breakdown!"), /*#__PURE__*/React.createElement("iframe", {
    id: "live_stream",
    title: "live_stream",
    width: "280",
    height: "157",
    src: "https://www.youtube.com/embed/live_stream?channel=UCSzP_Z3MrygWlbLMyrNmMkg&enablejsapi=1&rel=0&showinfo=0&allowfullscreen&mute=1",
    frameBorder: "0",
    allowFullScreen: true
  }), /*#__PURE__*/React.createElement("a", {
    href: videoUrl || CHANNEL_LINK,
    className: styles.link,
    target: "_blank",
    rel: "noopener noreferrer"
  }, ' '));
};

export default LiveWidget;