import React from 'react'
import cx from 'classnames'
import Svg from 'webkit/ui/Svg/react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export const Title = ({ id, children, link, externalLink }) => (
  <h2 id={id} className={cx(styles.title, 'row v-center justify')}>
    {children}

    {link && (
      <Link to={link} className='btn-0 btn-2 btn-3'>
        <Svg id='external-link' w={12} />
      </Link>
    )}

    {externalLink && (
      <a
        href={externalLink}
        target='_blank'
        rel='noopener noreferrer'
        className='btn-0 btn-2 btn-3'
      >
        <Svg id='external-link' w={12} />
      </a>
    )}
  </h2>
)

export const Content = ({ className, children, isGrid }) => (
  <div className={cx(styles.section, className, isGrid && styles.grid)}>{children}</div>
)

const Section = ({ children, title, isGrid, link, externalLink }) => (
  <>
    <Title externalLink={externalLink} link={link}>
      {title}
    </Title>
    <Content isGrid={isGrid}>{children}</Content>
  </>
)

export default Section
