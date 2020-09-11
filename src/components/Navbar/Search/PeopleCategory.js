import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Category from './Category'
import styles from './Suggestions.module.scss'

const DEFAULT_SUGGESTIONS = []

const POPULAR_AUTHORS_QUERY = gql`
  query {
    popularInsightAuthors {
      id
      username
      avatarUrl
    }
  }
`

const propsAccessor = ({ id }) => ({
  key: id,
  to: '/profile/' + id
})

const Person = ({ avatarUrl, username }) => (
  <>
    {avatarUrl ? (
      <img className={styles.avatar} src={avatarUrl} alt='Avatar' />
    ) : (
      <div className={styles.fallback}>{username[0].toUpperCase()}</div>
    )}
    {username}
  </>
)

function peoplePredicate (value) {
  const searchTerm = value.toLowerCase()
  return ({ username }) => username.toLowerCase().includes(searchTerm)
}

function usePeople () {
  const { data } = useQuery(POPULAR_AUTHORS_QUERY)
  return data ? data.popularInsightAuthors : DEFAULT_SUGGESTIONS
}

const PeopleCategory = ({ searchTerm }) => {
  const people = usePeople()
  const suggestions = useMemo(
    () => people.filter(peoplePredicate(searchTerm)).slice(0, 5),
    [searchTerm, people]
  )

  return suggestions.length ? (
    <Category
      title='People'
      items={suggestions}
      Item={Person}
      propsAccessor={propsAccessor}
    />
  ) : null
}

export default PeopleCategory
