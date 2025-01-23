const GenreButtons = ({handleSelectGenre, genres}) => {
  return(
    <div>
       {genres.map(g => <button onClick={() => handleSelectGenre(g)} key={g}>{g}</button> )}
    </div>
  )
}

export default GenreButtons