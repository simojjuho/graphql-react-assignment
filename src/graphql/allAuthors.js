import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      books {
        title
        published
      }
    }
  }
`

export default ALL_AUTHORS