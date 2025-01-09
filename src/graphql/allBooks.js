import { gql } from "@apollo/client"

const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      author
      published
      genres
    }
  }
`

export default ALL_BOOKS