import React from 'react'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import Search from './../../components/Search/SearchContainer'
import styles from './SearchMobilePage.module.scss'

const SearchMobilePage = ({ history }) => (
  <MobileHeader
    goBack={history.goBack}
    backRoute={'/'}
    classes={{
      wrapper: styles.wrapper,
      right: styles.hidden,
      title: styles.hidden
    }}
    title='Search'
  >
    <Search className={styles.search} />
  </MobileHeader>
)

export default SearchMobilePage
