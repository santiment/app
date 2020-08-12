import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from './ColorsExplanation.module.scss'

const TREEMAP_COLORS = [
  'var(--jungle-green)',
  'var(--jungle-green-light-3)',
  'var(--jungle-green-light-2)',
  'var(--mystic)',
  'var(--persimmon-light)',
  'var(--persimmon-light-2)',
  'var(--persimmon)'
]

export const COLOR_MAPS = {
  '10': TREEMAP_COLORS[0],
  '5': TREEMAP_COLORS[1],
  '1': TREEMAP_COLORS[2],
  '0': TREEMAP_COLORS[3],
  '-1': TREEMAP_COLORS[4],
  '-5': TREEMAP_COLORS[5],
  '-10': TREEMAP_COLORS[6]
}

export const getTreeMapColor = value => {
  if (value > 10) {
    return COLOR_MAPS['10']
  } else if (value > 5) {
    return COLOR_MAPS['5']
  } else if (value > 1) {
    return COLOR_MAPS['1']
  } else if (value <= 1 && value >= -1) {
    return COLOR_MAPS['0']
  } else if (value >= -5) {
    return COLOR_MAPS['-1']
  } else if (value >= -10) {
    return COLOR_MAPS['-5']
  } else {
    return COLOR_MAPS['-10']
  }
}

const COLORS = ['-10', '-5', '-1', '0', '1', '5', '10']

const DATE_MAPS = {
  '24h': "today's",
  '7d': "week's",
  '1h': "hour's"
}

const ColorsExplanation = ({ colorMaps, range }) => {
  return (
    <div className={styles.container}>
      <div className={styles.explanation}>
        <Icon type='info-round' className={styles.iconRound} />
        Color indicates {DATE_MAPS[range]} asset perfomance in percent. Size
        represents market cap.
      </div>
      <div className={styles.colors}>
        {COLORS.map(key => {
          return (
            <div
              key={key}
              className={styles.card}
              style={{ backgroundColor: colorMaps[key] }}
            >
              {key}%
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ColorsExplanation
