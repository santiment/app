import React from 'react';
import cx from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './index.module.css';
export const Tab = {
  index: {
    path: '',
    label: 'Studio'
  },
  stats: {
    path: '/stats',
    label: 'Key Stats'
  },
  insights: {
    path: '/related-insights',
    labelFormatter: name => name ? `${name} Insights` : 'Insights'
  }
};
const TABS = Object.values(Tab);
const SUBPATHS = new Set(TABS.map(({
  path
}) => path));

function getSubpath(path) {
  const slashPosition = path.lastIndexOf('/', path.length - 2);
  const subpath = path.slice(slashPosition, path.endsWith('/') ? -1 : undefined);
  return SUBPATHS.has(subpath) ? '' : subpath;
}

const Tabs = ({
  className,
  location: {
    pathname
  },
  match: {
    path: base
  },
  settings: {
    name,
    slug
  }
}) => {
  const subpath = getSubpath(pathname.slice(base.length));
  const search = window.location.search;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.tabs, className)
  }, TABS.map(({
    path,
    label,
    labelFormatter,
    checkVisibility
  }) => {
    if (checkVisibility && !checkVisibility({
      slug
    })) {
      return null;
    }

    return /*#__PURE__*/React.createElement(NavLink, {
      exact: true,
      key: path,
      to: {
        pathname: base + path + subpath,
        search
      },
      className: styles.tab,
      activeClassName: styles.active
    }, label || labelFormatter(name));
  }));
};

export default withRouter(Tabs);