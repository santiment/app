import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NewTemplateCard.module.scss'

const NewTemplateCard = () => {
  return (
    <Link className={styles.create} to='/studio'>
      <svg
        className={styles.svg}
        width='64'
        height='52'
        viewBox='0 0 64 52'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M43.1993 35.4046C43.1993 35.4046 61.7427 45.2687 61.3663 46.8379C60.99 48.407 59.3369 50.7904 57.0156 50.3753C54.6943 49.9602 45.6426 43.0959 40.9229 38.9733'
          stroke='var(--waterloo)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.6851 3.29519C26.8722 -0.0268697 33.441 4.12161 30.526 5.37259C20.6125 9.62705 11.6742 29.0799 28.6049 31.728C32.4559 32.3303 39.0962 39.1172 37.3666 41.9877C35.6371 44.8582 27.2358 46.6171 17.5016 44.6181C7.76739 42.6192 0.960018 33.7073 2.5282 20.6915C3.39663 13.4836 10.498 6.61725 18.6851 3.29519Z'
          fill='var(--porcelain)'
        />
        <path
          d='M46.1783 22.2874C47.565 32.7591 40.2002 42.3722 29.7285 43.7589C19.2568 45.1456 9.2552 40.1608 7.84388 28.2324C6.43257 16.304 14.2352 7.22429 24.7069 5.83762C34.7828 5.48257 44.7917 11.8158 46.1783 22.2874Z'
          stroke='var(--waterloo)'
          strokeWidth='1.5'
        />
        <path
          d='M16.2488 29.0282C13.1396 21.1504 19.6021 13.6109 27.7582 14.0053'
          stroke='var(--rhino)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      Start researching
    </Link>
  )
}

export default NewTemplateCard
