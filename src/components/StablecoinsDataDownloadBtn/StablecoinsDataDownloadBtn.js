import React from 'react'
import { Button } from 'semantic-ui-react'
import GoogleAnalytics from 'react-ga'
import styles from './StablecoinsDataDownloadBtn.module.scss'

const onDownloadBtnClick = () => {
  GoogleAnalytics.event({
    category: 'Stablecoins Data',
    action: 'Download'
  })
}

const StablecoinsDataDownloadBtn = () => {
  return (
    <Button className={styles.button} onClick={onDownloadBtnClick}>
      <a
        href='https://docs.google.com/spreadsheets/u/1/d/1OwF5xKsPRxFsy3WvSest-gn8lFbm7cTQLhW3ylZE_2M'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}
      />
      Download data as ...
    </Button>
  )
}

export default StablecoinsDataDownloadBtn
