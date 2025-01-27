import BirthForm from "./BirthForm"

const Authors = (props) => {
  
  
  if (!props.show) {
    return null
  }
  if(props.result.loading) {
    return (
      <div>loading...</div>
    )
  }
  if(props.result.data && props.result.data.allAuthors){
    const authors = props.result.data.allAuthors  
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BirthForm authors={authors} />
      </div>
    )
  }
  console.log(props.result)
  return (
    <div>loading...</div>
  )
}

export default Authors