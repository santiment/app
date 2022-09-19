import React from 'react'
import ShareMedias from '../../../../components/Share/medias/ShareMedias'
import styles from './Share.module.scss'

const Share = ({ shareLinkText }) => (
  <div className='row v-center'>
    <div className='body-3 c-waterloo mrg--r mrg-l'>Share</div>
    <ShareMedias
      shareLink={window.location.href}
      shareText={shareLinkText}
      showTitle={false}
      classes={{ medias: styles.medias, mediaBtn: styles.mediaBtn }}
    />
  </div>
)

export default Share
