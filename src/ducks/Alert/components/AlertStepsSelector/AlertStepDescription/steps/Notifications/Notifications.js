import React from "react";
import cx from "classnames";
import { useFormikContext } from "formik";
import Icon from "@santiment-network/ui/Icon";
import { formatChannelsTitles } from "../../../../../utils";
import styles from "./Notifications.module.scss";

const Notifications = ({ isSmall, description, status }) => {
  const { values } = useFormikContext();
  const {
    isPublic,
    settings: { channel }
  } = values;

  if (status !== "finish" || channel.length === 0) {
    return description || "";
  }

  const channels = formatChannelsTitles(channel);

  return (
    <div className={cx(styles.wrapper, isSmall && styles.small)}>
      <div className={styles.item}>
        {isPublic ? (
          <>
            <Icon type="eye" className={styles.icon} />
            Public alert
          </>
        ) : (
          <>
            <Icon type="eye-disabled" className={styles.icon} />
            Private alert
          </>
        )}
      </div>
      {channel.length > 0 && (
        <div className={cx(styles.item, styles.channels)}>
          <span className={styles.channelsText}>Notify me on </span>
          {channels.join(", ")}
        </div>
      )}
    </div>
  );
};

export default Notifications;
