import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import { getTemplateAssets, getTemplateMetrics } from '../utils'
import UserAvatar from '../../../../pages/Account/avatar/UserAvatar'
import styles from './TemplateDetailsDialog.module.scss'
import { Link } from 'react-router-dom'

const TemplateInfo = ({ template, as: El = Panel, classes = {} }) => {
  const usedAssets = getTemplateAssets(template)
  const usedMetrics = getTemplateMetrics(template)

  const {
    description,
    user: { id: userId, avatarUrl, username }
  } = template

  return (
    <El className={classes.templateInfo}>
      <div className={styles.block}>
        <div className={styles.icon}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.96854 0.661621C3.03737 0.242799 4.46338 0 6 0C7.53662 0 8.96263 0.242799 10.0315 0.661621C11.0353 1.05497 12 1.72526 12 2.68966C12 3.65405 11.0353 4.32434 10.0315 4.71769C8.96263 5.13651 7.53662 5.37931 6 5.37931C4.46338 5.37931 3.03737 5.13651 1.96854 4.71769C0.964701 4.32434 0 3.65405 0 2.68966C0 1.72526 0.964701 1.05497 1.96854 0.661621ZM2.56441 1.79173C1.65727 2.1472 1.44 2.5114 1.44 2.68966C1.44 2.86791 1.65727 3.23211 2.56441 3.58758C3.40657 3.91758 4.62055 4.13793 6 4.13793C7.37945 4.13793 8.59343 3.91758 9.43559 3.58758C10.3427 3.23211 10.56 2.86791 10.56 2.68966C10.56 2.5114 10.3427 2.1472 9.43559 1.79173C8.59343 1.46173 7.37945 1.24138 6 1.24138C4.62055 1.24138 3.40657 1.46173 2.56441 1.79173Z'
              fill='#7A859E'
            />
            <path
              d='M0.72 4.96552C1.11765 4.96552 1.44 5.24341 1.44 5.58621V6C1.44 6.17844 1.65727 6.54262 2.56425 6.89801C3.40633 7.22797 4.6203 7.44828 6 7.44828C7.3797 7.44828 8.59367 7.22797 9.43575 6.89801C10.3427 6.54262 10.56 6.17844 10.56 6V5.58621C10.56 5.24341 10.8824 4.96552 11.28 4.96552C11.6776 4.96552 12 5.24341 12 5.58621V6C12 6.96446 11.0355 7.63476 10.0316 8.02813C8.96281 8.44693 7.53678 8.68966 6 8.68966C4.46322 8.68966 3.03719 8.44693 1.96839 8.02813C0.964486 7.63476 0 6.96446 0 6V5.58621C0 5.24341 0.322355 4.96552 0.72 4.96552Z'
              fill='#7A859E'
            />
            <path
              d='M1.44 8.89655C1.44 8.55375 1.11765 8.27586 0.72 8.27586C0.322355 8.27586 0 8.55375 0 8.89655V9.31034C0 10.2748 0.964486 10.9451 1.96839 11.3385C3.03719 11.7573 4.46322 12 6 12C7.53678 12 8.96281 11.7573 10.0316 11.3385C11.0355 10.9451 12 10.2748 12 9.31034V8.89655C12 8.55375 11.6776 8.27586 11.28 8.27586C10.8824 8.27586 10.56 8.55375 10.56 8.89655V9.31034C10.56 9.48878 10.3427 9.85297 9.43575 10.2084C8.59367 10.5383 7.3797 10.7586 6 10.7586C4.6203 10.7586 3.40633 10.5383 2.56425 10.2084C1.65727 9.85297 1.44 9.48878 1.44 9.31034V8.89655Z'
              fill='#7A859E'
            />
          </svg>
        </div>
        <div className={styles.info}>
          <div className={styles.subTitle}>Assets</div>
          <div className={styles.description}>{usedAssets.join(', ')}</div>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.icon}>
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1V9C6 9.55228 5.55228 10 5 10C4.44772 10 4 9.55229 4 9V1ZM0 5C0 4.44772 0.447715 4 1 4C1.55228 4 2 4.44772 2 5V9C2 9.55228 1.55228 10 1 10C0.447715 10 0 9.55228 0 9V5ZM9 6C8.44771 6 8 6.44772 8 7V9C8 9.55229 8.44771 10 9 10C9.55229 10 10 9.55229 10 9V7C10 6.44772 9.55229 6 9 6Z'
              fill='#7A859E'
            />
          </svg>
        </div>
        <div className={styles.info}>
          <div className={styles.subTitle}>Metrics</div>
          <div className={styles.description}>{usedMetrics.join(', ')}</div>
        </div>
      </div>

      {description && (
        <div className={styles.block}>
          <Icon type='info-round' className={styles.icon} />
          <div className={styles.info}>
            <div className={styles.subTitle}>Description</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      )}

      <div className={styles.block}>
        <Icon type='profile' className={styles.icon} />
        <div className={styles.info}>
          <div className={styles.subTitle}>Author</div>
          <div className={cx(styles.description, styles.user)}>
            <UserAvatar
              userId={userId}
              isExternal
              externalAvatarUrl={avatarUrl}
              classes={styles}
            />
            <Link to={'/profile/' + userId} className={styles.link}>
              {username}
            </Link>
          </div>
        </div>
      </div>
    </El>
  )
}

export default TemplateInfo
