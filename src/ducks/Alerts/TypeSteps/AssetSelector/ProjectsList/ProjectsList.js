import React, { useCallback } from "react";
import cx from "classnames";
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import Label from "@santiment-network/ui/Label";
import { Checkbox } from "@santiment-network/ui/Checkboxes";

import ProjectIcon from "../../../../../components/ProjectIcon/ProjectIcon";

import { formatTokensCount } from "../../../../../utils/formatting";

import styles from "./styles.module.scss";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";

const ROW_HEIGHT = 32;
const MAX_SHOWING_ITEMS = 4;

const ProjectsList = ({
  items,
  listItems,
  onToggleProject,
  isContained,
  hideCheckboxes = false
}) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: ROW_HEIGHT
  });

  const shouldIncludeHeader = index => {
    if (
      (listItems.length > 0 && index === 0) ||
      (listItems.length > 0 && index === 1)
    ) {
      return true;
    }

    return listItems.length === 0 && index === 0;
  };

  const rowRenderer = useCallback(
    ({ key, index, style, parent }) => {
      const { name, ticker, slug, id, balance, logoUrl } = items[index];

      const isAssetInList = listItems.some(({ id: itemId }) => itemId === id);

      const hasHeader = shouldIncludeHeader(index);

      const isSelectedItem = listItems.length > 0 && index === 0;

      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={style} className={cx(hasHeader && styles.projectWrapper, isSelectedItem && styles.selectedItem)}>
            {hasHeader && (
              <div className={styles.sectionTitle}>
                {isSelectedItem ? "Selected" : "Assets"}
              </div>
            )}
            <div
              className={cx(
                styles.project,
                !hasHeader && styles.projectPadding
              )}
              onClick={() => {
                onToggleProject({
                  project: items[index],
                  listItems,
                  isAssetInList
                });
              }}
            >
              {!hideCheckboxes && (
                <Checkbox
                  isActive={isAssetInList}
                  disabled={isContained ? false : isAssetInList}
                />
              )}
              <div
                className={cx(
                  styles.asset,
                  !isContained && isAssetInList && styles.disabled
                )}
              >
                <ProjectIcon
                  className={styles.icon}
                  size={16}
                  slug={slug}
                  logoUrl={logoUrl}
                />
                <span className={styles.name}>{name}</span>
                <Label accent="waterloo">
                  (
                  {balance >= 0 && (
                    <Label className={styles.balance}>
                      {formatTokensCount(balance)}
                    </Label>
                  )}
                  {ticker})
                </Label>
              </div>
            </div>
          </div>
        </CellMeasurer>
      );
    },
    [listItems, items]
  );

  const wrapperStyles = {
    height:
      items.length > MAX_SHOWING_ITEMS ? `318px` : `${32 * items.length}px`,
    paddingRight: items.length > MAX_SHOWING_ITEMS ? "0px" : `5px`
  };

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      {items.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={styles.list}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowCount={items.length}
              overscanRowCount={5}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default ProjectsList;
