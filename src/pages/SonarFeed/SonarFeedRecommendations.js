import React from 'react'
import SignalCardsGrid, {
  defaultSignals
} from '../../components/SignalCard/SignalCardsGrid'
import Image from './sonar_activity_artboard.png'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import styles from './SonarFeedRecommendations.module.scss'

const SonarFeedRecommendations = ({ showButton }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <img className={styles.pic} alt='Artboard' src={Image} />
      <div className={styles.description}>
        Start to add signals you want to track or just interested in
      </div>
      {showButton && <SignalMasterModalForm label='Add your first signal' />}
    </div>

    {// Temporary hidden. Exist in figma, but not realized currently
      false && (
        <div>
          <h4 className={styles.subtitle}>Recommended for you</h4>
          <SignalCardsGrid signals={defaultSignals} />
        </div>
      )}
  </div>
)

export default SonarFeedRecommendations
