import React from 'react'
import cx from 'classnames'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './index.module.scss'

const Screener = ({ location, isLoggedIn, name, id, ...props }) => {
  return (
    <div className={('page', styles.container)}>
      {name}
      {/*       <GetAssets */}
      {/*         {...props} */}
      {/*         type={props.type} */}
      {/*         render={Assets => { */}
      {/*           const title = getTableTitle(props) */}
      {/*           const { */}
      {/*             typeInfo: { listId }, */}
      {/*             isLoading, */}
      {/*             isCurrentUserTheAuthor, */}
      {/*             isPublicWatchlist, */}
      {/*             items = [], */}
      {/*           } = Assets */}
      {/*  */}
      {/*           return ( */}
      {/*             <> */}
      {/*               <div className='page-head page-head-projects'> */}
      {/*                 <div className='page-head-projects__left'> */}
      {/*                   <h1 className={styles.heading}>{title}</h1> */}
      {/*                 </div> */}
      {/*               </div> */}
      {/*               {isLoading && <PageLoader />} */}
      {/*  */}
      {/*               {!isLoading && items.length > 0 && ( */}
      {/*                 <AssetsTable */}
      {/*                   Assets={Assets} */}
      {/*                   filterType={filterType} */}
      {/*                   items={items} */}
      {/*                   goto={props.history.push} */}
      {/*                   preload={props.preload} */}
      {/*                   listName={title} */}
      {/*                   allColumns={ASSETS_TABLE_COLUMNS} */}
      {/*                 /> */}
      {/*               )} */}
      {/*             </> */}
      {/*           ) */}
      {/*         }} */}
      {/*       /> */}
    </div>
  )
}

export default Screener
