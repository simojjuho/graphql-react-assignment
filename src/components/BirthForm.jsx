import { useMutation } from "@apollo/client"
import { useState } from 'react'
import EDIT_AUTHOR from "../graphql/editBirth"
import ALL_AUTHORS from "../graphql/allAuthors"

const BirthForm = ({ authors }) => {
  const [ name, setName ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')
  const [ editAuthor ] = useMutation( EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map(e => e.message).join(', ')
    }
  } )

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleBornChange = (e) => {
    setBirthYear(e.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()
    const born = parseInt(birthYear)
    editAuthor({ variables: { name, born }})
    setBirthYear('')
  }

  return (
    <form action="">
      <h2>Edit author birth year</h2>
      <label htmlFor="nameInput">Name:</label>
      <select onChange={handleNameChange} value={name}>
        {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
      </select>
      <br />
      <label htmlFor="bornInput">Born:</label>
      <input 
        type="number"
        value={birthYear}
        onChange={handleBornChange}
        id="bornInput"
      /><br />
      <button
        onClick={submit}
      >Submit</button>
    </form>
  )
}

export default BirthForm