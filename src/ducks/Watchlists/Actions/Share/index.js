import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Message from '@santiment-network/ui/Message'
import PublicityToggle from '../ChangeVisibility'
import Toggle from '../../../../components/VisibilityIndicator/Toggle'
import ShareModalTrigger from '../../../../components/Share/ShareModalTrigger'
import { useShortShareLink } from '../../../../components/Share/hooks'
import { checkIsScreener } from '../../../Screener/utils'
import { useUpdateWatchlist } from '../../gql/list/mutations'
import styles from './index.module.scss'

const Share = ({ watchlist, isAuthor, className, customLink, isMobile }) => {
  const [isPublic, setIsPublic] = useState(watchlist.isPublic)
  const { shortShareLink, getShortShareLink } = useShortShareLink()
  const [updateWatchlist] = useUpdateWatchlist(watchlist.type)

  const type = checkIsScreener(watchlist) ? 'screener' : 'watchlist'

  useEffect(() => {
    if (isPublic !== watchlist.isPublic) {
      setIsPublic(watchlist.isPublic)
    }
  }, [watchlist.isPublic])

  function handleToggleVisibility() {
    setIsPublic(!isPublic)
    updateWatchlist(watchlist, { isPublic: !isPublic })
  }

  return (
    <ShareModalTrigger
      classes={{
        title: cx(styles.shareTitle, isMobile && 'txt-m'),
      }}
      dialogTitle={isMobile ? 'Share' : `Share ${type}`}
      shareLink={customLink || shortShareLink}
      isDisabled={!isPublic}
      isMobile={isMobile}
      trigger={(props) => (
        <>
          {isMobile ? (
            <button
              {...props}
              className={cx(styles.trigger, 'mrg-xl mrg--r', className)}
              onMouseDown={customLink ? undefined : getShortShareLink}
            >
              <Icon type='share' height={19} width={17} />
            </button>
          ) : (
            <Button
              {...props}
              className={cx(styles.trigger, className)}
              onMouseDown={customLink ? undefined : getShortShareLink}
              icon='share'
            >
              Share
            </Button>
          )}
        </>
      )}
    >
      {isMobile ? (
        <div
          className={cx(
            styles.warningMessage,
            'row mrg-m mrg--b',
            isPublic && styles.warningMessage__hide,
          )}
        >
          <div>
            <Icon type='alert' className={styles.warningMessageIcon} />
          </div>
          <span className='mrg-s mrg--l'>
            Your watchlist is private. To able to share, please, switch it to “Public” first
          </span>
        </div>
      ) : (
        <div className={cx(styles.messageWrapper, isPublic && styles.messageWrapper__hide)}>
          <Message variant='warn' className={styles.message}>
            Your {type} is private. Please, switch it to “Public” first.
          </Message>
        </div>
      )}
      {isAuthor &&
        (isMobile ? (
          <div
            className={cx(
              styles.toggleWrapper,
              'row v-center justify fluid mrg-xl mrg--b',
              !isMobile && styles.toggle,
            )}
          >
            <span className='body-2'>Private watchlist</span>
            <Toggle isActive={isPublic} className='relative' onClick={handleToggleVisibility} />
          </div>
        ) : (
          <PublicityToggle variant='flat' watchlist={watchlist} className={styles.toggle} />
        ))}
    </ShareModalTrigger>
  )
}

export default Share
