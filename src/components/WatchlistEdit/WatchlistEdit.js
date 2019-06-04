import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { AutoSizer, List } from 'react-virtualized'
import { Button, Dialog, Icon, Label } from '@santiment-network/ui'
import {
  USER_ADD_ASSET_TO_LIST,
  USER_REMOVE_ASSET_FROM_LIST
} from '../../actions/types'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import SearchProjects from '../Search/SearchProjects'
import styles from './WatchlistEdit.module.scss'

class WatchlistEdit extends PureComponent {
  state = { open: false }

  openDialog = () => this.setState({ open: true })

  cancelDialog = () => this.setState({ open: false })

  toggleAsset = props => this.props.toggleAsset(props)

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
              {assets.map(({ name, ticker, id: projectId }) => (
                <div key={name} className={styles.project}>
                  <div className={styles.info}>
                    <Label accent='mirage'>{name}</Label>
                    <Label accent='waterloo' className={styles.ticker}>
                      ({ticker})
                    </Label>
                  </div>
                  <Button
                    accent='grey'
                    onClick={() =>
                      this.toggleAsset({
                        projectId,
                        assetsListId: id,
                        listItems: assets,
                        isAssetInList: true
                      })
                    }
                  >
                    <Icon type='remove' />
                  </Button>
                </div>
              ))}
              <Label accent='waterloo' className={styles.heading}>
                Add more assets
              </Label>
              <AssetsList
                items={allProjects}
                assetsListId={id}
                listItems={assets}
                onAddProject={this.toggleAsset}
              />
            </div>
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    )
  }
}

const ROW_HEIGHT = 32

const AssetsList = ({ items, listItems, assetsListId, onAddProject }) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id } = items[index]
    const isAssetInList = listItems.some(
      ({ id: projectId }) => projectId === id
    )
    return (
      <div key={key} className={styles.project} style={style}>
        <div className={styles.info}>
          <Label accent='mirage'>{name}</Label>
          <Label accent='waterloo' className={styles.ticker}>
            ({ticker})
          </Label>
        </div>
        <Button
          accent='positive'
          disabled={isAssetInList}
          onClick={() =>
            onAddProject({
              projectId: id,
              assetsListId,
              listItems,
              isAssetInList
            })
          }
        >
          <Icon type='plus-round' />
        </Button>
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

const mapStateToProps = ({ watchlistUi }) => ({ watchlistUi })

const mapDispatchToProps = dispatch => ({
  toggleAsset: ({ projectId, assetsListId, listItems, slug, isAssetInList }) =>
    dispatch({
      type: isAssetInList
        ? USER_REMOVE_ASSET_FROM_LIST
        : USER_ADD_ASSET_TO_LIST,
      payload: { projectId, assetsListId, listItems, slug }
    })
})

export default compose(
  graphql(allProjectsForSearchGQL, {
    options: () => ({ context: { isRetriable: true } })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WatchlistEdit)
