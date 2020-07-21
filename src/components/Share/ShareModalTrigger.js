import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@santiment-network/ui/Dialog'
import SharePanel from './SharePanel'
import ShareBtn from './ShareBtn'

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
export const getText = (text, link) =>
  isSafari ? `${text} ${encodeURIComponent(link)}` : text

const ShareModalTrigger = ({
  shareTitle,
  shareText,
  shareLink,
  trigger: Trigger = ShareBtn,
  classes,
  dialogTitle = '📣 Share the data',
  ...props
}) => {
  return window.navigator.share ? (
    <Trigger
      {...props}
      onClick={() => {
        window.navigator.share({
          title: shareTitle,
          text: getText(shareText, shareLink),
          url: shareLink
        })
      }}
    />
  ) : (
    <Dialog
      trigger={<Trigger {...props} />}
      title={dialogTitle}
      classes={classes}
    >
      <SharePanel
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
  shareText: PropTypes.string
}

ShareModalTrigger.defaultProps = {
  shareTitle: 'Sanbase',
  shareText: 'Hey! Look what I have found at the app.santiment.net!'
}

export default ShareModalTrigger
