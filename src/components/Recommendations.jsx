import { useEffect } from "react"

const Recommendations = ({show, userResult, setGenre, booksOfFavoriteGenre}) => {
  useEffect(() => {
    if(userResult.data)
      setGenre(userResult.data.me.favoriteGenre)
      return () => {
        setGenre('all')
      }
    }, [show])

  if(!show) {
    return null
  }

  if(userResult.data && booksOfFavoriteGenre.data) {
    return (
      <div>
        <h2>Books in your favorite genre:</h2>
        <table>
          <tbody>
            {booksOfFavoriteGenre.data.allBooks.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  return(
    <div>
      loading...
    </div>
  )
}

export default Recommendations