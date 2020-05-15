import React from "react";
import cx from "classnames";
import { Switch, Route } from "react-router-dom";
import StudioTabs from "./Tabs";
import StudioTabsChart from "./Tabs/Chart";
import StudioInfo from "../SANCharts/Header";
import styles from "./index.module.scss";

const Main = ({ topSlot, bottomSlot, onSlugChange, ...props }) => {
  const { settings, setSettings, setIsICOPriceDisabled } = props;

  function onProjectSelect(project) {
    if (!project) return;

    const { slug, name, ticker, id: projectId } = project;
    const title = `${name} (${ticker})`;
    setSettings(state => ({ ...state, slug, title, projectId, ticker }));
    setIsICOPriceDisabled(true);
    onSlugChange(slug);
  }

  return (
    <>
      <div className={styles.header}>
        {topSlot}
        <StudioInfo
          slug={settings.slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <StudioTabs />
      <div className={cx(styles.container, styles.content)}>
        <Switch>
          <Route path="/studio/key-stats">
            <div>Stats</div>
          </Route>
          <Route path="/studio">
            <StudioTabsChart {...props} />
          </Route>
        </Switch>
      </div>
      {bottomSlot}
    </>
  );
};

export default Main;
