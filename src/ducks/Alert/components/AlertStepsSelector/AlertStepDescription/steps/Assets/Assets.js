import React from "react";
import cx from "classnames";
import { useFormikContext } from "formik";
import { ProjectIcon } from "../../../../../../../components/ProjectIcon/ProjectIcon";
import { useAssets } from "../../../../../../../hooks/project";
import styles from "./Assets.module.scss";

const Assets = ({ description, isSmall }) => {
  const [projects, loading] = useAssets({
    shouldSkipLoggedInState: false
  });
  const { values } = useFormikContext();
  const {
    settings: {
      target: { slug }
    }
  } = values;

  if (!slug || slug.length === 0 || loading) {
    return description || "";
  }

  const assets =
    typeof slug === "string"
      ? projects.find(project => project.slug === slug)
      : slug.map(item => projects.find(project => project.slug === item));

  let children;

  if (typeof slug !== "string") {
    const shouldRenderTicker = slug.length > 1;

    children = (
      <>
        {assets.slice(0, 3).map(asset => (
          <div key={asset.id} className={styles.item}>
            <ProjectIcon
              size={16}
              slug={asset.slug}
              logoUrl={asset.logoUrl}
            />
            <div className={styles.title}>
              {shouldRenderTicker ? asset.ticker : asset.name}
            </div>
          </div>
        ))}
        {assets.length > 3 && (
          <div className={styles.item}>
            <div className={styles.title}>+ {assets.length - 3}</div>
          </div>
        )}
      </>
    );
  } else {
    children = (
      <div className={styles.item}>
        <ProjectIcon
          size={16}
          slug={assets.slug}
          logoUrl={assets.logoUrl}
        />
        <div className={styles.title}>{assets.name}</div>
      </div>
    );
  }

  return (
    <div className={cx(styles.wrapper, isSmall && styles.small)}>
      {children}
    </div>
  );
};

export default Assets;
