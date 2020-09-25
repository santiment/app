import React from 'react'
import { Chord as NivoChord } from '@nivo/chord'
import Loader from '@santiment-network/ui/Loader/Loader'
import { LABELS } from './matrix'
import styles from './index.module.scss'

const MARGIN = { top: 35, right: 35, bottom: 35, left: 35 }
const BORDER_COLOR = { from: 'color', modifiers: [['darker', 0.4]] }
const TEXT_COLOR = { from: 'color', modifiers: [['darker', 1]] }
const COLORS = { scheme: 'nivo' }

const Chord = ({ matrix, width, height, isLoading, isEmpty }) => {
  const isLoaded = !isLoading

  return (
    <div className={styles.chord}>
      {isLoading && <Loader className={styles.overlay} />}
      {isLoaded && isEmpty && (
        <div className={styles.overlay}>No data for this date</div>
      )}

      <NivoChord
        enableLabel
        isInteractive
        animate={isLoaded}
        width={width}
        height={height}
        matrix={matrix}
        keys={LABELS}
        margin={MARGIN}
        valueFormat='.2f'
        padAngle={0.02}
        innerRadiusRatio={0.95}
        arcBorderColor={BORDER_COLOR}
        ribbonBorderColor={BORDER_COLOR}
        labelTextColor={TEXT_COLOR}
        colors={COLORS}
        arcHoverOthersOpacity={0.2}
        ribbonHoverOpacity={1}
        ribbonHoverOthersOpacity={0.2}
        motionStiffness={300}
        motionDamping={40}
      />
    </div>
  )
}

Chord.defaultProps = {
  width: 600,
  height: 600
}

export default Chord
