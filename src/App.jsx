import { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"
import BOOK_ADDED from "./graphql/bookAdded";
import ALL_AUTHORS from "./graphql/allAuthors"
import ALL_BOOKS from "./graphql/allBooks"
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Error from "./components/Error";
import Recommendations from "./components/Recommendations";
import ME from "./graphql/me";

const App = () => {
  const [page, setPage] = useState("authors")
  const [chosenGenre, setGenre] = useState('all')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)
  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: chosenGenre === 'all' ? null : chosenGenre }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      window.alert(`Book added: ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}`)
      client.refetchQueries({include: [ ALL_AUTHORS, ALL_BOOKS ]})
    },
  })

  const logout = () => {
    localStorage.removeItem('library-login-token')
    setToken(null)
  }

  return (
    <div>
      <Error errorMsg={error} setError={setError}/>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token
          ? <button onClick={() => setPage("add")}>add book</button>
          : null}
        {token
          ? <button onClick={() => setPage("recommendations")}>recommendations</button>
          : null}
        { token
          ? <button onClick={logout}>Log out</button>
          : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} result={authorResult} />

      <Books show={page === "books"} result={bookResult} booksByGenre={booksByGenre} setGenre={setGenre} />

      <NewBook show={page === "add"} setError={setError} />

      <LoginForm show={page === "login"} setPage={setPage} setToken={setToken} setError={setError} />

      <Recommendations show={page === 'recommendations'} userResult={userResult} setGenre={setGenre} booksOfFavoriteGenre={booksByGenre} />
    </div>
  );
};

export default App;