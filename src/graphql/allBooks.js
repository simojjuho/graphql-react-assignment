import { gql } from "@apollo/client"

const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre){
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export default ALL_BOOKS