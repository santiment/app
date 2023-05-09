import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { extractYoutubeId } from './utils';
import YoutubeButton from './YoutubeButton';
import styles from './WebinarWidget.module.css';

const Video = ({
  url,
  imageUrl,
  title
}) => {
  const videoRef = useRef(null);
  const [isActivated, setIsActivated] = useState(false);
  const videoId = extractYoutubeId(url);

  const onVideoClicked = () => {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding&showinfo=0&autoplay=1`);
    videoRef.current.appendChild(iframe);
    setIsActivated(true);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.video, isActivated && styles.enabledVideo),
    onClick: onVideoClicked,
    ref: videoRef
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.preview
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.preview__img,
    src: imageUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    alt: title
  }), /*#__PURE__*/React.createElement(YoutubeButton, null)));
};

export default Video;