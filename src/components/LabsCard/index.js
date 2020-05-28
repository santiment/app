import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Card.module.scss'

const Card = ({ title, description, link, href, className, bgClassName }) => {
  const Wrapper = ({ children }) =>
    link ? (
      <Link to={link} className={cx(styles.colBox, className)}>
        {children}
      </Link>
    ) : (
      <a
        className={cx(styles.colBox, className)}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    )

  return (
    <Wrapper>
      <div className={cx(styles.cardBg, bgClassName)} />
      <div className={styles.cardhover}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDescription}>{description}</div>
        <button className={styles.cardButton}>
          <svg
            width='17'
            height='8'
            viewBox='0 0 17 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 7.04549C10 7.794 10.8502 8.25033 11.5057 7.85362L16.5375 4.80813C17.1542 4.43488 17.1542 3.56513 16.5375 3.19187L11.5057 0.146379C10.8502 -0.250329 10 0.206 10 0.954506V3.25H0.75C0.335786 3.25 0 3.58579 0 4C0 4.41421 0.335786 4.75 0.75 4.75H10V7.04549Z'
              fill='white'
            />
          </svg>
        </button>
      </div>
    </Wrapper>
  )
}

export default Card
