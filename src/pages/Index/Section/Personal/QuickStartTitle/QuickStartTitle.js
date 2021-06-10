import React from 'react'
import styles from './QuickStartTitle.module.scss'

const Img = (
  <svg
    width='48'
    height='48'
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='48' height='48' rx='24' fill='var(--jungle-green-light)' />
    <path
      d='M30.1266 29.6396C20.5243 22.3148 34.096 25.8707 35.3386 21.1452C38.1883 10.3081 17.4193 19.2374 14.8092 22.3148C6.12362 32.5555 39.7289 36.9645 30.1266 29.6396Z'
      fill='var(--jungle-green-light-3)'
    />
    <path
      d='M14.75 38.9803L14.75 34.082C15.584 32.5173 22.1172 20.2678 25.5444 14.0832L30.5117 16.7427C26.9498 23.116 20.359 34.7146 19.4633 36.2903L14.75 38.9803ZM30.7362 16.8629C30.7361 16.8628 30.7359 16.8627 30.7358 16.8626L30.7362 16.8629Z'
      stroke='var(--fiord)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M33.4539 18.3546L34.1144 18.71C34.2096 18.5332 34.2298 18.3255 34.1707 18.1336C34.1115 17.9417 33.9778 17.7815 33.7996 17.689L33.4539 18.3546ZM25.5508 14.2313L24.8896 13.8772L24.5345 14.5402L25.1986 14.8934L25.5508 14.2313ZM26.9812 28.7067C26.7776 29.0674 26.9049 29.5249 27.2657 29.7285C27.6264 29.9321 28.0838 29.8048 28.2875 29.4441L26.9812 28.7067ZM27.4365 10.7103L28.0978 11.0644L28.1036 11.0529L27.4365 10.7103ZM32.3456 13.2232L31.676 12.8853L31.6715 12.8946L32.3456 13.2232ZM30.0892 16.1401C29.9077 16.5124 30.0623 16.9614 30.4347 17.1429C30.807 17.3245 31.256 17.1698 31.4375 16.7975L30.0892 16.1401ZM33.4539 18.3546C33.7996 17.689 33.7996 17.6889 33.7995 17.6889C33.7995 17.6889 33.7994 17.6889 33.7993 17.6888C33.7991 17.6887 33.7988 17.6886 33.7984 17.6884C33.7977 17.688 33.7965 17.6874 33.795 17.6866C33.7919 17.685 33.7873 17.6826 33.7813 17.6795C33.7692 17.6732 33.7513 17.6639 33.7278 17.6517C33.6808 17.6273 33.6117 17.5914 33.5233 17.5454C33.3463 17.4535 33.0918 17.3213 32.7815 17.16C32.161 16.8375 31.3176 16.399 30.4262 15.9348C28.6415 15.0057 26.6693 13.9767 25.903 13.5691L25.1986 14.8934C25.9722 15.3049 27.9516 16.3376 29.7335 17.2653C30.6253 17.7296 31.469 18.1684 32.0897 18.491C32.4001 18.6523 32.6547 18.7846 32.8318 18.8766C32.9203 18.9225 32.9894 18.9584 33.0364 18.9829C33.0599 18.9951 33.0779 19.0044 33.09 19.0107C33.096 19.0138 33.1006 19.0162 33.1037 19.0178C33.1052 19.0186 33.1064 19.0192 33.1072 19.0196C33.1075 19.0198 33.1078 19.0199 33.108 19.02C33.1081 19.0201 33.1082 19.0201 33.1082 19.0201C33.1083 19.0202 33.1083 19.0202 33.4539 18.3546ZM28.2875 29.4441C28.8234 28.4947 30.2824 25.8068 31.6027 23.3653C32.2638 22.1426 32.8918 20.9788 33.3544 20.1207C33.5857 19.6917 33.7756 19.339 33.9078 19.0936C33.9739 18.9709 34.0255 18.875 34.0606 18.8098C34.0782 18.7772 34.0916 18.7523 34.1007 18.7355C34.1052 18.7271 34.1086 18.7207 34.1109 18.7165C34.1121 18.7143 34.1129 18.7127 34.1135 18.7116C34.1138 18.7111 34.114 18.7107 34.1142 18.7104C34.1142 18.7103 34.1143 18.7102 34.1143 18.7101C34.1144 18.7101 34.1144 18.71 33.4539 18.3546C32.7935 17.9991 32.7935 17.9992 32.7935 17.9992C32.7934 17.9993 32.7934 17.9994 32.7933 17.9995C32.7932 17.9998 32.7929 18.0002 32.7927 18.0007C32.7921 18.0018 32.7912 18.0034 32.7901 18.0055C32.7878 18.0098 32.7844 18.0161 32.7799 18.0245C32.7708 18.0413 32.7574 18.0662 32.7399 18.0987C32.7048 18.1639 32.6532 18.2597 32.5872 18.3823C32.4551 18.6276 32.2652 18.98 32.034 19.4089C31.5716 20.2666 30.944 21.4298 30.2832 22.6518C28.9595 25.0998 27.5087 27.7723 26.9812 28.7067L28.2875 29.4441ZM26.2119 14.5853L28.0977 11.0643L26.7754 10.3562L24.8896 13.8772L26.2119 14.5853ZM28.1036 11.0529C28.3903 10.495 28.8095 10.2146 29.2571 10.109C29.7246 9.99882 30.2632 10.0724 30.7459 10.3099C31.2286 10.5475 31.6033 10.9229 31.7856 11.3526C31.9592 11.762 31.9835 12.2762 31.6761 12.8853L33.0152 13.5611C33.5126 12.5755 33.5198 11.6002 33.1665 10.767C32.8219 9.95423 32.1599 9.33393 31.4082 8.96405C30.6566 8.59419 29.7631 8.44863 28.913 8.64904C28.0431 8.85411 27.2592 9.41404 26.7694 10.3676L28.1036 11.0529ZM31.6715 12.8946L30.0892 16.1401L31.4375 16.7975L33.0198 13.5519L31.6715 12.8946Z'
      fill='var(--rhino)'
    />
    <path
      d='M14.8584 33.6797L19.9649 36.3242'
      stroke='var(--fiord)'
      strokeWidth='1.5'
    />
  </svg>
)

const QuickStartTitle = ({ max, currentCount }) => {
  const percent = (100 * currentCount) / max

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {Img}
        <div className={styles.info}>
          <div className={styles.title}>Get to know Sanbase</div>
          <div className={styles.description}>
            We’re here to help you get things rolling
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div>
          {currentCount}/{max} done{' '}
          <span className={styles.highline}>({percent}%)</span>
        </div>
        <div className={styles.line}>
          <div
            className={styles.filled}
            style={{
              transform: `translateX(-${100 - percent}%)`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default QuickStartTitle
