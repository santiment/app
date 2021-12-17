import React from 'react'
import cx from 'classnames'
import { NavLink as Link } from 'react-router-dom'
import styles from './Logo.module.scss'

// FIXME: Remove the first svg and uncomment the second svg after christmas sale.

const Logo = ({ className }) => (
  <Link className={cx(styles.logo, className)} to='/'>
    <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 23C32 31.8366 24.8366 39 16 39C7.16344 39 0 31.8366 0 23C0 14.1634 7.16344 7 16 7C24.8366 7 32 14.1634 32 23Z" fill="white"/>
      <path d="M8.23212 23C8.23212 23.9328 7.46377 24.6889 6.51596 24.6889C5.56815 24.6889 4.7998 23.9328 4.7998 23C4.7998 22.0673 5.56815 21.3112 6.51596 21.3112C7.46377 21.3112 8.23212 22.0673 8.23212 23Z" fill="#181B2B"/>
      <path d="M25.4836 24.6889C26.4315 24.6889 27.1998 23.9328 27.1998 23C27.1998 22.0673 26.4315 21.3112 25.4836 21.3112C24.5358 21.3112 23.7675 22.0673 23.7675 23C23.7675 23.9328 24.5358 24.6889 25.4836 24.6889Z" fill="#181B2B"/>
      <path d="M19.427 16.613C17.9858 15.8584 16.3807 15.6196 15.0295 15.9366C13.6534 16.2595 12.4594 17.2031 12.2373 18.779C12.053 20.0859 12.4475 21.1082 13.132 21.9166C13.7702 22.6703 14.6549 23.227 15.4042 23.6886C16.2102 24.185 16.8786 24.5832 17.3733 25.0658C17.8278 25.5092 18.0711 25.9648 18.0711 26.5733C18.0711 27.2562 17.8618 27.6086 17.641 27.8096C17.3973 28.0314 17.0055 28.1893 16.4524 28.2282C15.3127 28.3084 13.9229 27.8501 13.1547 27.2647L11.935 28.8171C13.0792 29.689 14.9509 30.3016 16.5944 30.186C17.433 30.1271 18.3133 29.8704 18.9938 29.251C19.6972 28.6107 20.0642 27.6951 20.0642 26.5733C20.0642 25.3146 19.5061 24.3837 18.776 23.6714C18.0862 22.9983 17.1871 22.4717 16.4611 22.0245C15.6785 21.5424 15.0668 21.1367 14.6627 20.6595C14.3049 20.2369 14.1112 19.7597 14.2114 19.0489C14.2939 18.4639 14.7066 18.0301 15.4914 17.846C16.3011 17.656 17.4112 17.7805 18.4914 18.3461L19.427 16.613Z" fill="#181B2B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 37.8333C24.1922 37.8333 30.8333 31.1922 30.8333 23C30.8333 14.8078 24.1922 8.16667 16 8.16667C7.80778 8.16667 1.16667 14.8078 1.16667 23C1.16667 31.1922 7.80778 37.8333 16 37.8333ZM32 23C32 31.8366 24.8366 39 16 39C7.16344 39 0 31.8366 0 23C0 14.1634 7.16344 7 16 7C24.8366 7 32 14.1634 32 23Z" fill="#D2D6E7"/>
      <path d="M11.939 6.81644L32.1811 14.4772L31.6338 12.7388C30.5407 9.26721 33.3183 5.79983 36.8663 6.20695L39.2042 6.47522L35.4547 3.45451C29.6489 -1.22279 21.4385 -1.14254 15.7214 3.64738L11.939 6.81644Z" fill="#FF6363"/>
      <path d="M9.9905 4.72092C10.3715 3.80659 11.4061 3.38087 12.3012 3.77004L32.397 12.5066C33.2922 12.8958 33.709 13.9525 33.328 14.8668L32.4786 16.9049C32.0976 17.8192 31.0631 18.245 30.1679 17.8558L10.0721 9.11922C9.17695 8.73005 8.76015 7.67336 9.14117 6.75904L9.9905 4.72092Z" fill="#D2D6E7"/>
      <path d="M41.9741 5.03214C42.207 6.99122 40.8409 8.77219 38.9229 9.01004C37.0048 9.24789 35.2612 7.85255 35.0283 5.89347C34.7954 3.93439 36.1615 2.15342 38.0796 1.91557C39.9976 1.67772 41.7413 3.07305 41.9741 5.03214Z" fill="#D2D6E7"/>
    </svg>
    {/* <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
      <path fill='#fff' d='M32 16a16 16 0 11-32 0 16 16 0 0132 0z' />
      <path
        fill='#181B2B'
        d='M8.23 16a1.7 1.7 0 01-1.71 1.69A1.7 1.7 0 014.8 16c0-.93.77-1.69 1.72-1.69.94 0 1.71.76 1.71 1.69zM25.48 17.69A1.7 1.7 0 0027.2 16a1.7 1.7 0 00-1.72-1.69A1.7 1.7 0 0023.77 16c0 .93.77 1.69 1.71 1.69zM19.43 9.61a6.5 6.5 0 00-4.4-.67c-1.38.32-2.57 1.26-2.8 2.84-.18 1.3.22 2.33.9 3.14a9.31 9.31 0 002.27 1.77c.81.5 1.48.9 1.97 1.38.46.44.7.9.7 1.5 0 .69-.2 1.04-.43 1.24-.24.22-.63.38-1.19.42a5.43 5.43 0 01-3.3-.97l-1.21 1.56a7.42 7.42 0 004.65 1.37 3.92 3.92 0 002.4-.94 3.48 3.48 0 001.07-2.68c0-1.26-.55-2.19-1.28-2.9-.7-.67-1.6-1.2-2.32-1.65a7.52 7.52 0 01-1.8-1.36c-.35-.42-.55-.9-.45-1.61.08-.59.5-1.02 1.28-1.2a4.5 4.5 0 013 .5l.94-1.74z'
      />
      <path
        fill='#D2D6E7'
        d='M16 30.83a14.83 14.83 0 100-29.66 14.83 14.83 0 000 29.66zM32 16a16 16 0 11-32 0 16 16 0 0132 0z'
      />
    </svg>
    <span className={styles.logoText}>Sanbase</span> */}
  </Link>
)

export default Logo
