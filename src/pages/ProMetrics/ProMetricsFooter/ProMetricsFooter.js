import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import SubscriptionForm from '../../../components/SubscriptionForm/SubscriptionForm'
import downloadLinkSvg from './../../../assets/google-play.svg'
import styles from './ProMetricsFooter.module.scss'

const LEFT_LINKS = [
  {
    label: 'About us',
    link: 'https://santiment.net/about/'
  },
  {
    label: 'Academy',
    link: 'https://academy.santiment.net'
  },
  {
    label: 'Sanbase',
    link: 'https://app.santiment.net'
  },

  {
    label: 'Pricing',
    link: 'https://santiment.net/pricing/'
  },
  {
    label: 'Insights',
    link: 'https://insights.santiment.net'
  },
  {
    label: 'SanAPI',
    link: 'https://neuro.santiment.net/'
  },

  {
    label: 'Team',
    link: 'https://santiment.net/team/'
  },
  {
    label: 'Social Trends',
    link: 'https://santiment.net/labs/trends'
  },
  {
    label: 'Sansheets',
    link: 'https://sheets.santiment.net'
  },

  {
    label: 'Jobs',
    link: 'https://santiment.net/jobs/'
  },
  {
    label: 'Historical balance',
    link: 'https://app.santiment.net/labs/balance'
  },
  {
    label: 'Sandata',
    link: 'https://data.santiment.net'
  },

  {
    label: 'Contact us',
    link: 'mailto:support@santiment.net'
  },
  {
    label: 'Buy SAN',
    link: 'https://academy.santiment.net/san-tokens/how-to-buy-san/'
  }
]

const BOTTOM_LINKS = [
  {
    label: 'Terms',
    link: ''
  },
  {
    label: 'Privacy',
    link: ''
  }
]

const SOCIAL_MEDIAS = [
  {
    link: 'https://santiment.net/discord',
    item: (
      <svg
        className={styles.discord}
        width='20'
        height='15'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.63 13.5c.51.64 1.13 1.38 1.13 1.38a6.26 6.26 0 005.24-2.6c-.06-3.47-.9-6.88-2.47-9.98a8.47 8.47 0 00-4.8-1.8l-.25.27a11.4 11.4 0 014.27 2.17 13.96 13.96 0 00-8.9-1.55c-1.34.15-2.65.51-3.89 1.07-.63.28-1 .5-1 .5A11.56 11.56 0 017.44.7L7.28.5a8.47 8.47 0 00-4.81 1.8A22.93 22.93 0 000 12.28a6.2 6.2 0 005.22 2.6l.47-.57.68-.85a5.33 5.33 0 01-3-2.02c.61.4 1.27.75 1.96 1.01.81.32 1.65.57 2.51.74a11.99 11.99 0 006.92-.72 9.8 9.8 0 001.97-1.01 5.4 5.4 0 01-3.1 2.04zm-8.08-6a1.9 1.9 0 011.25-.61 1.81 1.81 0 011.74 1.9 1.82 1.82 0 01-1.74 1.9 1.9 1.9 0 01-1.25-3.2zm6.4-.37a1.9 1.9 0 011.1-.24 1.82 1.82 0 011.74 1.9 1.9 1.9 0 11-2.84-1.66z'
        />
      </svg>
    )
  },
  {
    link: 'https://twitter.com/santimentfeed',
    item: <Icon type='twitter' className={styles.twitter} />
  },
  {
    link: 'https://github.com/santiment',
    item: (
      <svg
        className={styles.github}
        width='21'
        height='20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10 0A10 10 0 000 10a10.1 10.1 0 006.81 9.5c.5.07.67-.24.67-.48V17.3c-2.76.61-3.37-1.35-3.37-1.35-.43-1.16-1.1-1.47-1.1-1.47-.92-.62.06-.62.06-.62.98.07 1.53 1.05 1.53 1.05.92 1.53 2.33 1.1 2.88.86.07-.68.37-1.1.62-1.35-2.21-.25-4.54-1.1-4.54-4.97 0-1.1.37-1.97 1.04-2.7-.06-.19-.43-1.23.12-2.58 0 0 .86-.24 2.76 1.04.8-.24 1.66-.3 2.52-.3.86 0 1.72.12 2.52.3 1.9-1.28 2.76-1.04 2.76-1.04.55 1.35.18 2.4.12 2.64.61.67 1.04 1.6 1.04 2.7 0 3.86-2.33 4.66-4.54 4.9.37.31.68.93.68 1.85v2.76c0 .24.18.55.67.49A10.01 10.01 0 0010 0z'
        />
      </svg>
    )
  },
  {
    link: 'https://t.me/santiment_network',
    item: <Icon type='telegram' className={styles.telegram} />
  },
  {
    link: 'https://www.youtube.com/c/santimentnetwork',
    item: (
      <svg
        className={styles.youtube}
        width='20'
        height='16'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M19.47 3.15a2.5 2.5 0 00-1.74-1.77C16.18.95 10 .95 10 .95s-6.18 0-7.73.41C1.44 1.6.76 2.3.53 3.16.13 4.72.13 8 .13 8s0 3.29.4 4.85c.23.86.9 1.54 1.74 1.77 1.56.43 7.73.43 7.73.43s6.18 0 7.73-.41a2.5 2.5 0 001.74-1.78c.4-1.57.4-4.84.4-4.84s.02-3.29-.4-4.87z' />
        <path d='M8.59 10.82L12.82 8 8.6 5.18v5.64z' fill='var(--white)' />
      </svg>
    )
  }
]

const ProMetricsFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.leftLinks}>
            <svg
              className={styles.santimentLogo}
              width='98'
              height='19'
              viewBox='0 0 98 19'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M43.0847 1.42919C43.0847 1.00567 43.2033 0.66184 43.4411 0.396956C43.6789 0.132073 43.9919 0 44.3792 0C44.7665 0 45.0876 0.128384 45.3431 0.383675C45.5979 0.639704 45.726 0.987963 45.726 1.42919C45.726 1.85271 45.5979 2.18326 45.3431 2.42158C45.0876 2.6599 44.7665 2.77869 44.3792 2.77869C43.9919 2.77869 43.6797 2.65547 43.4418 2.4083C43.204 2.16112 43.0847 1.835 43.0847 1.42919Z'
                fill='var(--mirage)'
              />
              <path
                d='M45.3298 5.45114V18.6828H43.4286V5.45114H45.3298Z'
                fill='var(--mirage)'
              />
              <path
                d='M36.1398 5.45112H34.5287V7.17102H36.1398V15.3219C36.1398 16.6102 36.329 17.5406 36.7075 18.1139C37.086 18.6872 37.7148 18.9742 38.5955 18.9742C39.1058 18.9742 39.594 18.9166 40.0608 18.8023C40.5277 18.6872 40.9548 18.533 41.3421 18.3389L40.9724 16.8308C40.6727 16.954 40.3951 17.0551 40.1404 17.1348C39.8848 17.2137 39.5815 17.2536 39.2295 17.2536C38.8076 17.2536 38.5035 17.0816 38.3186 16.7378C38.1338 16.394 38.041 15.834 38.041 15.0578V7.17176H40.8929V5.45186H38.041V2.22308L36.1398 2.8318V5.45112Z'
                fill='var(--mirage)'
              />
              <path
                d='M4.55469 16.5127C4.90666 16.7245 5.32491 16.9053 5.80942 17.0551C6.2932 17.2048 6.79097 17.2801 7.30126 17.2801C7.88224 17.2801 8.37485 17.134 8.77984 16.8411C9.18483 16.5482 9.38733 16.0737 9.38733 15.4171C9.38733 14.8674 9.26362 14.4151 9.01768 14.0602C8.77101 13.7053 8.4588 13.3858 8.08031 13.1017C7.70183 12.8184 7.29242 12.5572 6.85209 12.3196C6.41175 12.082 6.00234 11.7972 5.62386 11.463C5.24538 11.1287 4.93243 10.7333 4.68649 10.2765C4.43982 9.81908 4.31685 9.23914 4.31685 8.53598C4.31685 7.41078 4.62022 6.563 5.22771 5.99118C5.83519 5.41935 6.69377 5.13381 7.80271 5.13381C8.52433 5.13381 9.14949 5.20022 9.67745 5.33229C10.2054 5.46436 10.6634 5.64587 11.0507 5.8746L10.5493 7.46243C10.215 7.28608 9.82693 7.14073 9.38733 7.02563C8.94699 6.91126 8.49782 6.85371 8.04055 6.85371C7.40656 6.85371 6.94487 6.98578 6.65401 7.25067C6.36315 7.51555 6.21809 7.93022 6.21809 8.49466C6.21809 8.93589 6.34106 9.31071 6.58774 9.61913C6.83442 9.92828 7.14663 10.2101 7.52511 10.4662C7.90359 10.7222 8.313 10.9819 8.75333 11.2468C9.19293 11.5117 9.60234 11.8245 9.98156 12.1861C10.36 12.5476 10.6723 12.98 10.9189 13.4824C11.1656 13.9849 11.2886 14.6165 11.2886 15.3743C11.2886 15.8686 11.2091 16.3357 11.0507 16.7769C10.8924 17.2181 10.6502 17.6018 10.3247 17.9279C9.9985 18.2548 9.59424 18.5145 9.10973 18.7086C8.62521 18.9026 8.05749 19 7.40656 19C6.63192 19 5.96258 18.9247 5.39928 18.775C4.83597 18.6252 4.36029 18.4267 3.97297 18.1795L4.55469 16.5127Z'
                fill='var(--mirage)'
              />
              <path
                d='M0 12.4104C0 11.9623 0.118916 11.626 0.357486 11.4016C0.596057 11.1772 0.91809 11.0653 1.32432 11.0653C1.73056 11.0653 2.05259 11.1778 2.29116 11.4016C2.52973 11.626 2.64865 11.9623 2.64865 12.4104C2.64865 12.8753 2.52973 13.2196 2.29116 13.4433C2.05259 13.6671 1.73056 13.7796 1.32432 13.7796C0.91809 13.7796 0.596057 13.6671 0.357486 13.4433C0.118916 13.2196 0 12.8753 0 12.4104Z'
                fill='var(--mirage)'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.4229 5.50427C14.6917 5.68061 14.071 5.92778 13.5607 6.24505L14.1895 7.75098C14.5739 7.52225 15.0533 7.33189 15.6291 7.18211C16.2049 7.03232 16.7366 6.95707 17.2255 6.95707C18.0097 6.95707 18.5509 7.15997 18.8477 7.56578C19.1437 7.97159 19.2924 8.67696 19.2924 9.68263C19.2924 10.1062 19.2666 10.5917 19.2143 11.1384C19.0214 11.1207 18.8381 11.1118 18.6636 11.1118H18.14C17.3543 11.1118 16.6423 11.1782 16.0054 11.3103C15.3677 11.4431 14.8176 11.6682 14.3552 11.9854C13.8921 12.3034 13.5342 12.7181 13.2809 13.2294C13.0269 13.7407 12.9009 14.376 12.9009 15.1345C12.9009 16.2988 13.2021 17.2115 13.8052 17.8734C14.4082 18.5352 15.1814 18.8657 16.1254 18.8657C16.9818 18.8657 17.6636 18.6983 18.1702 18.3633C18.6768 18.0283 19.0612 17.6313 19.3233 17.1724H19.4279L19.8896 18.7337H21.3785C21.2548 18.2216 21.1708 17.6793 21.1252 17.106C21.0795 16.5334 21.0574 15.9115 21.0574 15.2408C21.0574 14.3413 21.0795 13.3888 21.1252 12.3831C21.1701 11.3774 21.1929 10.346 21.1929 9.28715C21.1929 8.75813 21.1539 8.25123 21.0744 7.76573C20.9956 7.28098 20.8277 6.8486 20.5729 6.46936C20.3174 6.09085 19.9654 5.79055 19.5163 5.56993C19.0671 5.35006 18.4728 5.23938 17.7336 5.23938C16.9236 5.23938 16.1534 5.32792 15.4229 5.50427ZM18.7166 12.6096C18.8911 12.6185 19.0641 12.6318 19.2386 12.6495H19.2379V15.454C19.0811 15.8775 18.8035 16.2656 18.4029 16.6183C18.0031 16.971 17.4376 17.1473 16.7071 17.1473C16.1681 17.1473 15.7292 16.9533 15.3898 16.5652C15.0503 16.1771 14.881 15.6303 14.881 14.9242C14.881 14.466 14.9723 14.0868 15.1549 13.7865C15.3375 13.4869 15.5856 13.2486 15.8986 13.0723C16.2115 12.8959 16.5679 12.7727 16.9685 12.7019C17.3691 12.6318 17.7777 12.5964 18.1952 12.5964C18.369 12.5964 18.5428 12.6008 18.7166 12.6096Z'
                fill='var(--mirage)'
              />
              <path
                d='M31.0159 18.6827V10.6115C31.0159 9.28857 30.8613 8.3316 30.5535 7.74059C30.245 7.14958 29.6949 6.85445 28.9026 6.85445C28.198 6.85445 27.617 7.06621 27.1597 7.48972C26.7017 7.91324 26.3674 8.43342 26.1561 9.05099V18.6834H24.2549V5.45108H25.6282L25.9713 6.85371H26.0508C26.3851 6.37707 26.8387 5.97199 27.4108 5.63628C27.983 5.3013 28.6655 5.13381 29.4578 5.13381C30.0211 5.13381 30.5182 5.2135 30.9497 5.37213C31.3812 5.53077 31.742 5.80008 32.0328 6.17933C32.3229 6.55857 32.5431 7.06547 32.6933 7.70075C32.8428 8.33602 32.9179 9.13879 32.9179 10.109V18.6827H31.0159Z'
                fill='var(--mirage)'
              />
              <path
                d='M55.022 10.8233V18.682H56.9233V9.15583C57.0816 8.45046 57.3592 7.89044 57.7553 7.47578C58.1515 7.06112 58.6839 6.85378 59.3532 6.85378C60.1455 6.85378 60.6514 7.13637 60.8715 7.70082C61.091 8.266 61.2014 9.12116 61.2014 10.2678V18.682H63.1027V10.0287C63.1027 9.07615 63.0408 8.28666 62.9178 7.66024C62.7949 7.03455 62.6049 6.53135 62.3501 6.1521C62.0946 5.77285 61.7603 5.50797 61.3465 5.35819C60.9327 5.20841 60.4356 5.13315 59.8546 5.13315C59.15 5.13315 58.5034 5.30949 57.9136 5.66218C57.3238 6.0156 56.8702 6.50036 56.5536 7.11793C56.3069 6.37714 55.9682 5.86065 55.5367 5.56995C55.1045 5.2785 54.5544 5.13315 53.8858 5.13315C53.0935 5.13315 52.4419 5.29252 51.9316 5.60979C51.4213 5.9278 50.9809 6.34246 50.6113 6.85378H50.5318L50.1886 5.45116H48.8419V18.682H50.7431V9.15583C50.9022 8.55597 51.1879 8.02252 51.6017 7.55473C52.0148 7.08768 52.5214 6.85378 53.12 6.85378C53.525 6.85378 53.8505 6.92904 54.0972 7.07882C54.3438 7.2286 54.5368 7.4625 54.6781 7.77977C54.8188 8.09778 54.9116 8.50801 54.9557 9.01048C54.9999 9.51369 55.022 10.118 55.022 10.8233Z'
                fill='var(--mirage)'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M73.9302 17.7826C73.5075 18.1707 72.97 18.471 72.3191 18.682C71.6674 18.8938 70.9811 18.9993 70.2595 18.9993C69.4319 18.9993 68.7147 18.8363 68.1072 18.5101C67.4997 18.184 66.9982 17.7162 66.6021 17.1075C66.2059 16.4988 65.9158 15.7713 65.731 14.9242C65.5462 14.0772 65.4534 13.1247 65.4534 12.0666C65.4534 9.80882 65.8672 8.08818 66.6949 6.90617C67.5225 5.72415 68.6926 5.13315 70.2072 5.13315C70.6998 5.13315 71.1888 5.19513 71.6733 5.31835C72.1571 5.4423 72.593 5.68874 72.9803 6.05913C73.3676 6.42953 73.6798 6.95044 73.9177 7.6204C74.1555 8.29109 74.2741 9.16469 74.2741 10.2405C74.2741 10.5408 74.2608 10.8625 74.2343 11.2063C74.2078 11.5501 74.1769 11.9072 74.1423 12.2784H67.4342C67.4342 13.0369 67.4953 13.7253 67.619 14.3428C67.7419 14.9604 67.9356 15.485 68.1999 15.9174C68.4643 16.3497 68.803 16.6847 69.2168 16.923C69.6307 17.1614 70.1454 17.2802 70.7617 17.2802C71.2374 17.2802 71.7079 17.1924 72.1747 17.0153C72.6409 16.8389 72.9972 16.6272 73.2447 16.38L73.9302 17.7826ZM72.4516 10.6913C72.487 9.36833 72.3021 8.39808 71.8971 7.78051C71.4921 7.16294 70.9369 6.85452 70.2337 6.85452C69.4238 6.85452 68.7809 7.16368 68.306 7.78051C67.8303 8.39808 67.549 9.36833 67.4607 10.6913H72.4516Z'
                fill='var(--mirage)'
              />
              <path
                d='M83.7016 10.6115V18.6827H85.6021V10.109C85.6021 9.13879 85.527 8.33602 85.3775 7.70075C85.2273 7.06547 85.0079 6.55857 84.717 6.17933C84.4269 5.80008 84.0661 5.53077 83.6346 5.37213C83.2031 5.2135 82.7061 5.13381 82.1428 5.13381C81.3512 5.13381 80.6686 5.3013 80.0965 5.63628C79.5243 5.97199 79.0707 6.37707 78.7364 6.85371H78.6569L78.3138 5.45108H76.9405V18.6834H78.8417V9.05099C79.0531 8.43342 79.3874 7.91324 79.8454 7.48972C80.3026 7.06621 80.8836 6.85445 81.5883 6.85445C82.3806 6.85445 82.9307 7.14958 83.2392 7.74059C83.547 8.3316 83.7016 9.28857 83.7016 10.6115Z'
                fill='var(--mirage)'
              />
              <path
                d='M87.2136 5.45112H88.8247V2.8318L90.726 2.22308V5.45186H93.5779V7.17176H90.726V15.0578C90.726 15.834 90.818 16.394 91.0036 16.7378C91.1884 17.0816 91.4918 17.2536 91.9145 17.2536C92.2664 17.2536 92.5698 17.2137 92.8253 17.1348C93.0801 17.0551 93.3577 16.954 93.6574 16.8308L94.027 18.3389C93.6397 18.533 93.2126 18.6872 92.7465 18.8023C92.2797 18.9166 91.7915 18.9742 91.2805 18.9742C90.3998 18.9742 89.771 18.6872 89.3925 18.1139C89.014 17.5406 88.8247 16.6102 88.8247 15.3219V7.17102H87.2136V5.45112Z'
                fill='var(--mirage)'
              />
              <path
                d='M95.7088 11.1934C95.4703 11.4178 95.3514 11.7541 95.3514 12.2022C95.3514 12.6671 95.4703 13.0114 95.7088 13.2352C95.9474 13.4589 96.2694 13.5714 96.6757 13.5714C97.0819 13.5714 97.404 13.4589 97.6425 13.2352C97.8811 13.0114 98 12.6671 98 12.2022C98 11.7541 97.8811 11.4178 97.6425 11.1934C97.404 10.9697 97.0819 10.8571 96.6757 10.8571C96.2694 10.8571 95.9474 10.969 95.7088 11.1934Z'
                fill='var(--mirage)'
              />
            </svg>

            <span className={styles.santimentTitle}>
              Behavioral analytics for the crypto market
            </span>
          </div>

          <div className={styles.centerLinks}>
            <div className={styles.links}>
              {LEFT_LINKS.map(({ label, link }, index) => {
                return (
                  <a
                    key={index}
                    href={link}
                    className={styles.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {label}
                  </a>
                )
              })}
            </div>
          </div>

          <div className={styles.rightLinks}>
            <div className={styles.subscription}>
              <div className={styles.subcriptionTitle}>
                Subscribe to the weekly Digest!
              </div>
              <SubscriptionForm
                classes={styles}
                hideCheckbox
                subscribeBtnLabel='Subscribe'
                subscriptionLabel='Send me weekly updates from crypto market'
              />
            </div>

            <div className={styles.appBlock}>
              <div className={styles.downloadTitle}>Download Santiment app</div>
              <a
                href='https://play.google.com/store/apps/details?id=net.santiment.sanbase.android'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.downloadLink}
              >
                <img src={downloadLinkSvg} alt='Google play' />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomLinks}>
            <div className={styles.bottomLeft}>
              © 2016—{new Date().getFullYear()} Santiment
            </div>

            <div className={styles.bottomCenter}>
              {BOTTOM_LINKS.map(({ label, link }, index) => {
                return (
                  <a
                    key={index}
                    href={link}
                    className={cx(styles.link, styles.bottomLink)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {label}
                  </a>
                )
              })}
            </div>
          </div>

          <div className={cx(styles.bottomRight)}>
            <div className={styles.socialTitle}>Santiment on social media</div>

            <div className={styles.mediaLinks}>
              {SOCIAL_MEDIAS.map(({ link, item }, index) => {
                return (
                  <a
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cx(styles.link, styles.mediaLink)}
                  >
                    {item}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProMetricsFooter
