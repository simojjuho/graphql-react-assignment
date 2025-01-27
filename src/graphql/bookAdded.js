import { gql } from "@apollo/client";

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
    }
  }
`

export default BOOK_ADDED