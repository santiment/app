import React from 'react'

const matchWords = (str1, str2) => str1.toLowerCase() === str2.toLowerCase()

const detectWordWithAllTickersSlugs = ({ word, allAssets }) => {
  return allAssets.find(
    ({ slug, ticker }) => matchWords(word, slug) || matchWords(word, ticker)
  )
}

const withDetectionAsset = WrappedComponent => {
  return class extends React.Component {
    render () {
      const { allAssets = [], word = '' } = this.props
      const detectedAsset = detectWordWithAllTickersSlugs({ allAssets, word })
      return <WrappedComponent detectedAsset={detectedAsset} {...this.props} />
    }
  }
}

export default withDetectionAsset
