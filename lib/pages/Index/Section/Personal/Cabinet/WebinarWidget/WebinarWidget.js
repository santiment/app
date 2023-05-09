function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Video from './Video';
import styles from './WebinarWidget.module.css';
const VIDEOS_QUERY = gql`
  {
    getWebinars {
      title
      description
      url
      imageUrl
      startTime
      endTime
      insertedAt
      isPro
    }
  }
`;
let VIDEOS = [];
export const useVideos = () => {
  const {
    data,
    loading,
    error
  } = useQuery(VIDEOS_QUERY);
  return useMemo(() => {
    if (data && data.getWebinars && VIDEOS.length === 0) {
      VIDEOS = data.getWebinars;
    }

    return [VIDEOS, loading, error];
  }, [data, loading, error]);
};

const WebinarWidget = () => {
  const [videos] = useVideos();
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.videos
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, videos.map((videoData, idx) => /*#__PURE__*/React.createElement(Video, _extends({
    key: idx
  }, videoData))))), /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/c/SantimentNetwork",
    className: styles.more
  }, "Watch more on ", /*#__PURE__*/React.createElement("span", {
    className: styles.word
  }, "Youtube"), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "12",
    className: styles.youtube
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15.574 2.123a2 2 0 00-1.392-1.42C12.945.356 8 .356 8 .356s-4.946 0-6.182.332A2.041 2.041 0 00.425 2.123C.1 3.384.1 6 .1 6s0 2.629.325 3.877a2 2 0 001.393 1.42c1.249.346 6.182.346 6.182.346s4.945 0 6.182-.332a2 2 0 001.392-1.42c.325-1.262.325-3.878.325-3.878s.014-2.629-.325-3.89z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.871 8.257L10.257 6 6.87 3.743v4.514z",
    fill: "#fff"
  }))));
};

export default WebinarWidget;