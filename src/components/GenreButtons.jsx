const GenreButtons = ({setGenre, genres}) => {
  const handleSelectGenre = (genre) => {
    setGenre(genre)
  }
  return(
    <div>
       {genres.map(g => <button onClick={handleSelectGenre(g)} key={g}>{g}</button> )}
    </div>
  )
}

export default GenreButtons