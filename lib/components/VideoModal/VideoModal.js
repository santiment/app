import React from 'react';
import cx from 'classnames';
import Dialog from '@santiment-network/ui/Dialog';
import LigthVideoPlayBtn from '../VideoPlayBtn/VideoPlayBtn';
import styles from './VideoModal.module.css';

const VideoModal = ({
  videoId,
  classes = {},
  playBtn: PlayBtn = LigthVideoPlayBtn
}) => {
  if (!videoId) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Dialog, {
    trigger: /*#__PURE__*/React.createElement("div", {
      className: cx(styles.video, classes.media),
      style: {
        backgroundImage: `url('https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg')`
      }
    }, /*#__PURE__*/React.createElement(PlayBtn, {
      className: classes.playBtn
    }), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.darkWrapper, classes.darkWrapper)
    })),
    classes: styles
  }, /*#__PURE__*/React.createElement("iframe", {
    className: styles.iframe,
    title: "Video modal",
    allowFullScreen: true,
    allow: "autoplay",
    src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`
  }));
};

export default VideoModal;