import { gql } from "@apollo/client"

const ME = gql`
  query me{
    me{
      username
      favoriteGenre
    }
  }
`

export default ME