import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import ShareModalTrigger from '../../../../../components/Share/ShareModalTrigger'
import Toggle from '../../../../../components/VisibilityIndicator/Toggle'
import { useShortShareLink } from '../../../../../components/Share/hooks'
import { updateTrigger } from '../../../../Signals/common/actions'
import styles from './Share.module.scss'

const Share = ({ signal, isAuthor, updateAlert }) => {
  const { id } = signal
  const [isPublic, setIsPublic] = useState(signal.isPublic)
  const { shortShareLink, getShortShareLink } = useShortShareLink(`/alert/${id}`)

  useEffect(() => {
    if (isPublic !== signal.isPublic) {
      setIsPublic(signal.isPublic)
    }
  }, [signal.isPublic])

  function handleToggleVisibility() {
    setIsPublic(!isPublic)
    updateAlert({
      ...signal,
      isPublic: !isPublic,
    })
  }

  return (
    <ShareModalTrigger
      classes={{
        title: cx(styles.shareTitle, 'txt-m'),
      }}
      dialogTitle='Share'
      shareLink={shortShareLink}
      isDisabled={isAuthor && !isPublic}
      isMobile
      feature='alert'
      source='alerts'
      trigger={(props) => (
        <button
          {...props}
          className={cx(styles.trigger, 'btn-2 row hv-center fluid')}
          onMouseDown={getShortShareLink}
        >
          <Icon type='share' height={19} width={17} />
          <span className='body-2 mrg-s mrg--l'>Share</span>
        </button>
      )}
    >
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
          Your alert is private. To able to share, please, switch it to “Public” first
        </span>
      </div>
      {isAuthor && (
        <div className={cx(styles.toggleWrapper, 'row v-center justify fluid mrg-xl mrg--b')}>
          <span className='body-2'>Private alert</span>
          <Toggle isActive={isPublic} className='relative' onClick={handleToggleVisibility} />
        </div>
      )}
    </ShareModalTrigger>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateAlert: (payload) => {
    dispatch(updateTrigger(payload))
  },
})

export default connect(null, mapDispatchToProps)(Share)
