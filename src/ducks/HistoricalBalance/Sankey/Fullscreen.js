import React from 'react'
import Title from './Title'
import Sankey from './Sankey'
import FullscreenDialogBtn from '../../../components/FullscreenDialogBtn'
import styles from './index.module.scss'

const Fullscreen = props => (
  <div className={styles.fullscreen}>
    <Title>Fullscreen</Title>

    <FullscreenDialogBtn
      title={`${props.address} Money Flow`}
      className={styles.fullscreen__btn}
      dialogClasses={styles}
    >
      <Sankey id='sankey-fullscreen-graph' {...props} />
    </FullscreenDialogBtn>
  </div>
)

export default Fullscreen
