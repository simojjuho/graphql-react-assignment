import { useEffect, useState } from "react"
import GenreButtons from "./GenreButtons"

const Books = (props) => {
  const [genres, setGenres] = useState(['all'])
  const [books, setBooks] = useState([])
  const booksByGenre = props.booksByGenre
  useEffect(() => {
    props.setGenre('all')
  }, [props.show])
  useEffect(() => {
    if(props.result.data){
      setBooks(props.result.data.allBooks)
    }
  }, [props.result.loading, props.show])

  useEffect(() => {
    setGenres(books.reduce((acc, current) => {
      let temp = acc
      current.genres.forEach(g => {
        if(!acc.includes(g)) temp = acc.concat(g)
      })
    return temp
    }, ['all']))
  }, [books, props.show])

  const handleSelectGenre = (genre) => {
    props.setGenre(genre)
  }
  
  if (!props.show) {
    return null
  }

  if(booksByGenre.data) {
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksByGenre.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <GenreButtons handleSelectGenre={handleSelectGenre} genres={genres}/>
      </div>
    )
  }

  return(
    <div>loading...</div>
  )
}

export default Books