import React from 'react'
import Assets from './Assets'
import AssetCard from './AssetCard'

const AssetsMobilePage = props => {
  return (
    <div className='page'>
      <Assets
        {...props}
        type={props.type}
        render={Assets => (
          <div>
            {!Assets.isLoading &&
              Assets.items.map(asset => (
                <AssetCard key={asset.id} {...asset} />
              ))}
          </div>
        )}
      />
    </div>
  )
}

export default AssetsMobilePage
