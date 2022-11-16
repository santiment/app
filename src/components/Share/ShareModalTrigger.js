import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@santiment-network/ui/Dialog'
import { trackShareFormOpen } from 'webkit/analytics/events/interaction'
import SharePanel from './SharePanel'
import ShareBtn from './ShareBtn'

const ShareModalTrigger = ({
  shareTitle,
  shareText,
  shareLink,
  trigger: Trigger = ShareBtn,
  isDisabled,
  children,
  classes,
  dialogTitle = 'Share the data',
  isDialogOnly,
  isAlert,
  isMobile,
  onOpen,
  ...props
}) => {
  return !isDialogOnly && window.navigator.share ? (
    <Trigger
      {...props}
      onClick={() => {
        trackShareFormOpen(props.source)
        window.navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareLink,
        })
      }}
    />
  ) : (
    <Dialog
      size='m'
      trigger={isDialogOnly && !isAlert ? null : <Trigger {...props} />}
      title={dialogTitle}
      classes={classes}
      onOpen={onOpen}
      {...props}
    >
      <SharePanel
        source={props.source}
        isMobile={isMobile}
        isAlert={isAlert}
        children={children}
        isDisabled={isDisabled}
        shareTitle={shareTitle}
        shareText={shareText}
        shareLink={shareLink}
      />
    </Dialog>
  )
}

ShareModalTrigger.propTypes = {
  shareLink: PropTypes.string.isRequired,
  shareTitle: PropTypes.string,
  shareText: PropTypes.string,
}

ShareModalTrigger.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!',
}

export default ShareModalTrigger
