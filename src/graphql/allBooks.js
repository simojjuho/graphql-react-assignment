import { gql } from "@apollo/client"

const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      author {
        name, born, bookCount
      }
      published
      genres
    }
  }
`

export default ALL_BOOKS