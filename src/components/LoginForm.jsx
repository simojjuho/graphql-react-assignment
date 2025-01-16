import { useMutation } from "@apollo/client"
import LOGIN from "../graphql/login"
import { useEffect, useState } from "react"

const LoginForm = ({show, setError, setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.value
      setToken(token)
      localStorage.setItem('library-login-token', token)
    }
  }, [result.data])

  if(!show) {
    return null
   }

  const submit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  return (
    <form>
      <div>
        <label htmlFor="usernameInput">Username</label>
        <input 
          type="text"
          id="usernameInput"
          value={username}
          onChange={handleUsernameChange}
         />
      </div>
      <div>
        <label htmlFor="passwordInput">Password</label>
        <input 
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
         />
      </div>
      <button onClick={submit}>Login</button>
    </form>
  )
}

export default LoginForm