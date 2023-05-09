function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Route as BasicRoute, Switch, Redirect, withRouter } from 'react-router-dom';
import cx from 'classnames';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import nprogress from 'nprogress';
import { newGlobalShortcut } from 'webkit/utils/events';
import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte';
import FeatureWalkthrough from 'webkit/ui/FeatureWalkthrough/svelte';
import { showMasterSelectorDialog } from 'studio/MasterSelectorDialog';
import { queryAllProjects } from 'studio/api/project';
import { isListPath, PATHS } from './paths';
import ErrorBoundary from './components/ErrorContent/ErrorBoundary';
import PageLoader from './components/Loader/PageLoader';
import { useSavedComment } from './hooks/comment'; // import './index.scss'
// import './App.scss'

const LoadablePage = loader => Loadable({
  loader,
  loading: PageLoader
});

const LoadableDashboardsPage = LoadablePage(() => import('./pages/Dashboards/Dashboards'));
const LoadableNftInfluencersTrxPage = LoadablePage(() => import('./pages/NftInfluencersTrx/NftInfluencersTrx'));

class Route extends React.Component {
  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    return /*#__PURE__*/React.createElement(BasicRoute, this.props);
  }

}

export const App = ({
  isDesktop,
  isLoggedIn,
  location: {
    pathname,
    search
  },
  history
}) => {
  const [isWatchlistPage, setIsWatchlistPage] = useState(false);
  useSavedComment(isLoggedIn);
  useEffect(() => {
    const svelte = new FeatureWalkthrough({
      target: document.body
    });
    return () => svelte.$destroy();
  }, []);
  useEffect(() => {
    if (pathname.includes(PATHS.STUDIO) || pathname.includes(PATHS.CHARTS)) {
      return;
    }

    const svelte = new Dialogs({
      target: document.body
    });
    return () => svelte.$destroy();
  }, [pathname]);
  useEffect(() => {
    if (isListPath(pathname)) {
      if (!isWatchlistPage) {
        setIsWatchlistPage(true);
      }
    } else if (isWatchlistPage) {
      setIsWatchlistPage(false);
    }
  }, [pathname]);
  useEffect(() => {
    if (!isDesktop) return;
    queryAllProjects();
    return newGlobalShortcut('CMD+K', () => {
      const onSelect = window.location.pathname.startsWith('/charts') ? null : ({
        slug,
        address
      }) => window.__onLinkClick(`/charts?${address ? 'address' : 'slug'}=${address || slug}`);
      showMasterSelectorDialog(onSelect);
    });
  }, [isDesktop]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx('App', isWatchlistPage && isDesktop && 'list-container')
  }, /*#__PURE__*/React.createElement(ErrorBoundary, {
    history: history
  }, /*#__PURE__*/React.createElement(ErrorBoundary, {
    history: history
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: PATHS.DASHBOARDS,
    render: props => /*#__PURE__*/React.createElement(LoadableDashboardsPage, _extends({}, props, {
      isDesktop: isDesktop
    }))
  }), /*#__PURE__*/React.createElement(Route, {
    path: PATHS.NFT,
    render: props => {
      if (isDesktop) {
        return /*#__PURE__*/React.createElement(Redirect, {
          to: "/"
        });
      }

      return /*#__PURE__*/React.createElement(LoadableNftInfluencersTrxPage, props);
    }
  }), /*#__PURE__*/React.createElement(Redirect, {
    from: PATHS.LABELS,
    to: PATHS.ETH_ANALYSIS
  })))));
};

function isPathnameInPages(pathname, pages) {
  return pages.some(path => !pathname.replace(path, '').includes('/'));
}

const mapStateToProps = ({
  user,
  rootUi
}, {
  location: {
    pathname
  }
}) => ({
  isLoggedIn: user.data && !!user.data.id,
  isUserLoading: user.isLoading,
  token: user.token
});

const enhance = compose(connect(mapStateToProps), withRouter);
export default enhance(App);