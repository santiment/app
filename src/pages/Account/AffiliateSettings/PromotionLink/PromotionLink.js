import React from 'react'
import copy from 'copy-to-clipboard'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ShareMedias from '../../../../components/Share/medias/ShareMedias'
import styles from './PromotionLink.module.scss'

const PromotionLink = ({ data, classes }) => {
  const { referralLink } = data

  return (
    <>
      <div className={styles.copyBlock}>
        <Input className={styles.linkInput} value={referralLink} disabled />
        <Button
          onClick={() => copy(referralLink)}
          className={styles.copyButton}
        >
          <Icon type='copy' className={styles.copyIcon} />
        </Button>
      </div>

      <div className={styles.block}>
        <div className={classes.title}>Share on social media</div>

        <div className={styles.share}>
          <ShareMedias
            shareLink={referralLink}
            showShareLabel={false}
            classes={styles}
          />
        </div>
      </div>
    </>
  )
}

export default PromotionLink
