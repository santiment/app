import React, { PureComponent } from 'react'
import { Button, Dialog, Icon, Label } from '@santiment-network/ui'
import SearchProjects from '../Search/SearchProjects'
import { AutoSizer, List } from 'react-virtualized'
import { graphql } from 'react-apollo'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import styles from './WatchlistEdit.module.scss'

class WatchlistEdit extends PureComponent {
  state = {
    open: false
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  cancelDialog = () => {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state
    const {
      trigger,
      name,
      data: { allProjects },
      assets,
      id
    } = this.props

    return (
      <Dialog
        title={`Edit "${name}"`}
        trigger={trigger}
        onOpen={this.openDialog}
        onClose={this.cancelDialog}
        open={open}
      >
        <Dialog.ScrollContent withPadding>
          <div className={styles.wrapper}>
            <SearchProjects className={styles.search} />
            <div className={styles.contentWrapper}>
              <Label accent='waterloo' className={styles.heading}>
                Contained in watchlist
              </Label>
              {assets.map(({ name, ticker }) => (
                <div key={name} className={styles.project}>
                  <div className={styles.info}>
                    <Label accent='mirage'>{name}</Label>
                    <Label accent='waterloo' className={styles.ticker}>
                      ({ticker})
                    </Label>
                  </div>
                  <div className={styles.actions}>
                    <Button accent='positive'>
                      <Icon type='plus-round' />
                    </Button>
                  </div>
                </div>
              ))}
              <Label accent='waterloo' className={styles.heading}>
                Add more assets
              </Label>
              <AssetsList items={allProjects} />
            </div>
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    )
  }
}

const ROW_HEIGHT = 32

const AssetsList = ({ items }) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker } = items[index]
    return (
      <div key={key} className={styles.project} style={style}>
        <div className={styles.info}>
          <Label accent='mirage'>{name}</Label>
          <Label accent='waterloo' className={styles.ticker}>
            ({ticker})
          </Label>
        </div>
        <div className={styles.actions}>
          <Button accent='positive'>
            <Icon type='plus-round' />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={items.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default graphql(allProjectsForSearchGQL, {
  options: () => ({
    context: { isRetriable: true }
  })
})(WatchlistEdit)
