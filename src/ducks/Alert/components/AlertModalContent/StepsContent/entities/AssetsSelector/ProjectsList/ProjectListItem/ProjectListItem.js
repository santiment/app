import React, { forwardRef } from "react";
import cx from "classnames";
import { Checkbox } from "@santiment-network/ui/Checkboxes";
import Label from "@santiment-network/ui/Label";
import { ProjectIcon } from "../../../../../../../../../components/ProjectIcon/ProjectIcon";
import styles from "../ProjectsList.module.scss";

const ProjectListItem = forwardRef(
  (
    {
      style,
      isSelectedItem,
      onToggleProject,
      item,
      listItems,
      isAssetInList,
      slug,
      logoUrl,
      name,
      ticker
    },
    ref
  ) => (
    <div
      ref={ref}
      style={style}
      className={cx(isSelectedItem && styles.selectedItem)}
    >
      <div
        className={styles.project}
        onClick={() => {
          onToggleProject({
            project: item,
            listItems,
            isAssetInList
          });
        }}
      >
        <Checkbox isActive={isAssetInList} />
        <div className={styles.asset}>
          <ProjectIcon
            className={styles.icon}
            size={16}
            slug={slug}
            logoUrl={logoUrl}
          />
          <span className={styles.name}>{name}</span>
          <Label accent="waterloo" className={styles.label}>
            ({ticker})
          </Label>
        </div>
      </div>
    </div>
  )
);

export default ProjectListItem;
