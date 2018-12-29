import styles from './Toggle.module.scss'
import React from 'react'
import cx from 'classnames'

const Toggle = ({ isActive, className = '', onClick, ...props }) => {
  return (
    <div
      className={cx({
        [`${styles.toggle} ${className}`]: true,
        [styles.active]: isActive
      })}
      onClick={onClick}
      {...props}
    >
      <svg
        width='36'
        height='20'
        viewBox='0 0 36 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='36' height='20' rx='10' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.7803 7.21967C14.0732 7.51256 14.0732 7.98744 13.7803 8.28033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303L6.21967 10.2803C5.92678 9.98744 5.92678 9.51256 6.21967 9.21967C6.51256 8.92678 6.98744 8.92678 7.28033 9.21967L9 10.9393L12.7197 7.21967C13.0126 6.92678 13.4874 6.92678 13.7803 7.21967Z'
          fill='#DCF6EF'
        />

        <path
          d='M24.2803 7.21967C23.9874 6.92678 23.5126 6.92678 23.2197 7.21967C22.9268 7.51256 22.9268 7.98744 23.2197 8.28033L24.9393 10L23.2197 11.7197C22.9268 12.0126 22.9268 12.4874 23.2197 12.7803C23.5126 13.0732 23.9874 13.0732 24.2803 12.7803L26 11.0607L27.7197 12.7803C28.0126 13.0732 28.4874 13.0732 28.7803 12.7803C29.0732 12.4874 29.0732 12.0126 28.7803 11.7197L27.0607 10L28.7803 8.28033C29.0732 7.98744 29.0732 7.51256 28.7803 7.21967C28.4874 6.92678 28.0126 6.92678 27.7197 7.21967L26 8.93934L24.2803 7.21967Z'
          fill='#EBEEF5'
        />
      </svg>
    </div>
  )
}

export default Toggle
