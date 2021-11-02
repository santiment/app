import React, { useCallback, useEffect, useMemo, useState } from "react";

import AssetIcon from "../../../../components/Illustrations/AssetIcon";
import SearchProjects from "../../../../components/Search/SearchProjects";
import ProjectsList from "./ProjectsList/ProjectsList";

import { useAssets } from "../../../../hooks/project";
import { hasAssetById } from "./utils";

import styles from "./styles.module.scss";

const AssetSelector = ({ handleFormValueChange }) => {
  const [projects, loading, error] = useAssets({
    shouldSkipLoggedInState: false
  });

  const [listItems, setListItems] = useState([]);

  const checkedAssetsAsSet = useMemo(() => {
    return new Set(listItems);
  }, [listItems]);

  const setSelectedAssets = useCallback(
    selected => {
      const newItems =
        selected.length > 0 ? [selected[selected.length - 1]] : selected;

      if (listItems.length !== newItems.length) {
        handleFormValueChange({
          field: "asset",
          value: newItems[0]
        });
        setListItems(newItems);
      }
    },
    [setListItems, listItems]
  );

  const toggleAsset = useCallback(
    ({ project, listItems: items, isAssetInList }) => {
      if (isAssetInList) {
        setSelectedAssets(items.filter(({ id }) => id !== project.id));
        handleFormValueChange({
          field: "asset",
          value: {}
        });
      } else {
        setSelectedAssets([...items, project]);
      }
    },
    [setSelectedAssets, listItems]
  );

  const onSuggestionSelect = useCallback(
    project => {
      if (project) {
        const target = project.item ? project.item : project;
        toggleAsset({
          project: target,
          listItems,
          isAssetInList: hasAssetById({ listItems, id: target.id })
        });
      }
    },
    [toggleAsset, listItems]
  );

  const sortedProjects = useMemo(() => {
    return projects
      .slice()
      .sort(({ rank: a }, { rank: b }) => (a || Infinity) - (b || Infinity));
  }, [projects]);

  const allProjects = useMemo(() => {
    return [
      ...listItems,
      ...projects.filter(project => !listItems.includes(project))
    ];
  }, [listItems, projects]);

  return (
    <>
      <div className={styles.title}>
        <AssetIcon className={styles.icon} />
        Select Asset
      </div>
      <SearchProjects
        noTrends
        searchIconPosition="left"
        className={styles.search}
        projects={sortedProjects}
        suggestionsProps={{ style: { zIndex: 50 } }}
        checkedAssets={checkedAssetsAsSet}
        onSuggestionSelect={onSuggestionSelect}
        inputProps={{ autoFocus: true, placeholder: "Search for asset" }}
      />
      <ProjectsList
        isContained
        classes={styles}
        listItems={listItems}
        items={allProjects}
        onToggleProject={toggleAsset}
      />
    </>
  );
};

export default AssetSelector;
