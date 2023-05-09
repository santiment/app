function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getIdFromSEOLink } from 'san-webkit/lib/utils/url';
import SanQueries from 'san-queries/lib/index.svelte';
import { queryDashboard } from 'san-queries/lib/api/dashboard';
import { parseSharedUrl } from 'san-queries/lib/sharing/url';
import PageLoader from '../../components/Loader/PageLoader';

const Queries = ({
  dashboardId,
  panelId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef();
  const svelteRef = useRef();
  useEffect(() => {
    const page = ref.current;

    window.__getShareBase = () => '/queries/';

    const id = getIdFromSEOLink(dashboardId || '');

    if (Number.isFinite(id)) {
      queryDashboard(id).then(dashboard => {
        start(dashboard, panelId);
      }).catch(() => {
        start();
      });
    } else {
      const {
        panels,
        selectedPanelId
      } = parseSharedUrl(window.location.search);
      start(panels && {
        panels
      }, selectedPanelId);
    }

    function start(dashboard, selectedPanelId) {
      setIsLoading(false);
      svelteRef.current = new SanQueries({
        target: page,
        props: {
          dashboard,
          selectedPanelId
        }
      });
    }

    return () => {
      delete window.__getShareBase;
      if (svelteRef.current) svelteRef.current.$destroy();
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, isLoading && /*#__PURE__*/React.createElement(PageLoader, null), /*#__PURE__*/React.createElement("div", {
    ref: ref
  }));
};

export default (props => {
  const {
    isDesktop,
    location
  } = props;

  if (!isDesktop) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/"
    });
  }

  return /*#__PURE__*/React.createElement(Queries, _extends({}, props, props.match.params, {
    search: location.search
  }));
});