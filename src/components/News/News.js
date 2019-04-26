import React from 'react'
import { connect } from 'react-redux'
import { NEWS_DATA_FETCH } from './actions'
import NewsCard from './NewsCard'
import styles from './News.module.scss'

class News extends React.PureComponent {
  componentDidMount () {
    this.props.requestNews()
  }

  render () {
    const { data = [], isLoading, isError } = this.props
    if (!data.length || isLoading || isError) return null
    else {
      return (
        <section className={styles.wrapper}>
          <h3 className={styles.title}>{`News (${data.length})`}</h3>
          <div className={styles.items}>
            {data.map(item => (
              <NewsCard
                key={`${item.title} ${item.description}`}
                className={styles.item}
                {...item}
              />
            ))}
          </div>
        </section>
      )
    }
  }
}

const mapStateToProps = state => ({
  word: state.news.word,
  data: state.news.data,
  isLoading: state.news.isLoading,
  isError: state.news.isError
})

const mapDispatchToProps = dispatch => ({
  requestNews: () => dispatch({ type: NEWS_DATA_FETCH })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)
