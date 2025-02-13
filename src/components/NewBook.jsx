import { useMutation } from '@apollo/client'
import { useState } from 'react'
import ADD_BOOK from '../graphql/addBook'
import ALL_BOOKS from '../graphql/allBooks'
import ALL_AUTHORS from '../graphql/allAuthors'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [num, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ ALL_AUTHORS, ALL_BOOKS ],
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map(e => e.message).join(', ')
      props.setError(errorMessages)
    }
  }
  )

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const published = parseInt(num)
    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={num}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook