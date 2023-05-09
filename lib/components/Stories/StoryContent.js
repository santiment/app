import React, { useState, useRef } from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import { mapSizesToProps } from '../../utils/withSizes';
import YoutubeButton from './YoutubeButton';
import styles from './StoryContent.module.css';

const StoryContent = ({
  slides,
  active,
  onNext,
  onPrev,
  onToggleSlide,
  onClick,
  onMediaClicked,
  isPaused,
  isPhone
}) => {
  const {
    title,
    description,
    buttonText,
    buttonLink,
    image,
    videoId,
    isDarkImage
  } = slides[active];
  let [widthSlideProgress, setWidthSlideProgress] = useState(null);
  const activeStoryRef = useRef(null);
  const videoRef = useRef(null);

  if (isPaused && !widthSlideProgress) {
    const elem = activeStoryRef.current.children[active].children[0];
    setWidthSlideProgress(elem.offsetWidth);
  }

  if (!isPaused && widthSlideProgress) setWidthSlideProgress(null);

  const onVideoClicked = evt => {
    evt.stopPropagation();

    if (videoId && videoRef.current && !isPaused) {
      let iframe = document.createElement('iframe');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay');
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`);
      videoRef.current.appendChild(iframe);
      onMediaClicked(evt);
    }

    onClick && onClick();
  };

  const isNotLastSlide = active < slides.length - 1;
  const isNotFirstSlide = active >= 1;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.content,
    onClick: isPhone ? onToggleSlide : onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.media, isDarkImage && styles.dark, isPaused && videoId && styles.enabledVideo),
    onClick: isPhone ? () => {} : onVideoClicked,
    ref: videoRef
  }, videoId && /*#__PURE__*/React.createElement("div", {
    className: styles.preview
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.preview__img,
    src: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    alt: title
  }), /*#__PURE__*/React.createElement(YoutubeButton, {
    onPlayClick: isPhone ? onVideoClicked : () => {}
  })), image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  })), title && /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), buttonLink && /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: buttonLink,
    rel: "noopener noreferrer",
    target: "_blank",
    variant: "fill",
    accent: "positive",
    className: styles.button
  }, buttonText)), isNotLastSlide && /*#__PURE__*/React.createElement("div", {
    className: styles.next,
    onClick: onNext
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-big"
  })), isNotFirstSlide && /*#__PURE__*/React.createElement("div", {
    className: styles.prev,
    onClick: onPrev
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-left-big"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.lines,
    style: {
      '--amount': slides.length
    },
    ref: activeStoryRef
  }, slides.map((slide, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: cx(styles.line, active > idx && styles.full)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.progress, active === idx && !isPaused && styles.activeLine),
    style: {
      '--width': active === idx ? isPaused ? `${widthSlideProgress}px` : '100%' : 0
    }
  })))));
};

export default withSizes(mapSizesToProps)(StoryContent);