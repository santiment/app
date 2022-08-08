import React from 'react'
import cx from 'classnames'
import Svg from 'webkit/ui/Svg/react'
import styles from './index.module.scss'

export const Title = ({ id, children, externalLink }) => (
  <h2 id={id} className={cx(styles.title, 'row v-center justify')}>
    {children}

    {externalLink && (
      <a href={externalLink} target='_blank' className={cx(styles.titleLink, 'row hv-center')}>
        <Svg id='external-link' w={12} />
      </a>
    )}
  </h2>
)

export const Content = ({ className, children, isGrid }) => (
  <div className={cx(styles.section, className, isGrid && styles.grid)}>{children}</div>
)

const Section = ({ children, title, isGrid, externalLink }) => (
  <>
    <Title externalLink={externalLink}>{title}</Title>
    <Content isGrid={isGrid}>{children}</Content>
  </>
)

export default Section
