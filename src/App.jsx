import { useState } from "react";
import { useQuery } from "@apollo/client"
import ALL_AUTHORS from "./graphql/allAuthors"
import ALL_BOOKS from "./graphql/allBooks"
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors")
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  const logout = () => {
    localStorage.removeItem('library-login-token')
    setToken(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token
          ? <button onClick={() => setPage("add")}>add book</button>
          : null}
        { token
          ? <button onClick={logout}>Log out</button>
          : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} result={authorResult} />

      <Books show={page === "books"} result={bookResult} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} setError={setError} />
    </div>
  );
};

export default App;