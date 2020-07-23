import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from './ColorsExplanation.module.scss'

const TREEMAP_COLORS = [
  'var(--jungle-green)',
  '#89E1C9',
  '#DCF6EF',
  'var(--mystic)',
  '#FFE6E6',
  '#EFA7A7',
  'var(--persimmon)'
]

export const COLOR_MAPS = {
  '20': TREEMAP_COLORS[0],
  '5': TREEMAP_COLORS[1],
  '5 - 0': TREEMAP_COLORS[2],
  '0': TREEMAP_COLORS[3],
  '0 - (-5)': TREEMAP_COLORS[4],
  '-5': TREEMAP_COLORS[5],
  '-20': TREEMAP_COLORS[6]
}

export const getTreeMapColor = value => {
  if (value > 20) {
    return COLOR_MAPS['20']
  } else if (value > 5) {
    return COLOR_MAPS['5']
  } else if (value > 0) {
    return COLOR_MAPS['5 - 0']
  } else if (value === 0) {
    return COLOR_MAPS['0']
  } else if (value >= -5) {
    return COLOR_MAPS['0 - (-5)']
  } else if (value >= -20) {
    return COLOR_MAPS['-5']
  } else {
    return COLOR_MAPS['-20']
  }
}

const COLORS = ['20', '5', '5 - 0', '0', '0 - (-5)', '-5', '-20']

const ColorsExplanation = ({ colorMaps }) => {
  return (
    <div className={styles.container}>
      <div className={styles.explanation}>
        <Icon type='info-round' className={styles.iconRound} />
        Color indicates today's asset perfomance in percent. Size represents
        market cap.
      </div>
      <div className={styles.colors}>
        {COLORS.map(key => {
          return (
            <div
              key={key}
              className={styles.card}
              style={{ backgroundColor: colorMaps[key] }}
            >
              {key}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ColorsExplanation
