import React from 'react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import styles from './PrePublishPopup.module.scss'

const PrePublishPopup = ({
  onPublishInsight,
  defaultTags = [],
  onTagsChange
}) => (
  <ContextMenu
    trigger={
      <Button accent='positive' border>
        Publish insight
        <Icon type='arrow-down' className={styles.icon} />
      </Button>
    }
  >
    <Panel padding className={styles.wrapper}>
      <p className={styles.paragraph}>Add tags to catch more attention.</p>
      <p className={styles.paragraph}>
        The first tag determines the insight’s preview image, featured on the
        main feed.
      </p>
      <div className={styles.label}>
        <span className={styles.bold}>Tags</span>({defaultTags.length}/5)
      </div>
      {/* <TagSelector */}
      {/*  onChange={onTagsChange} */}
      {/*  defaultTags={defaultTags} */}
      {/*  className={styles.tags} */}
      {/* /> */}
      <div className={styles.tags}>
        {defaultTags.map(tag => (
          <div key={tag} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>
      <p className={styles.warning}>
        You’ll not be able to edit an insight after publishing
      </p>
      <Button
        variant='fill'
        accent='positive'
        className={styles.button}
        onClick={onPublishInsight}
      >
        Publish insight
      </Button>
    </Panel>
  </ContextMenu>
)

export default PrePublishPopup
