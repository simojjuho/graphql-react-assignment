import { useEffect } from "react"

const Error = ({ errorMsg, setError }) => {
  useEffect(() => {
    if(errorMsg) {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }, [errorMsg])
  
  if(!errorMsg) {
    return null
  }

  const errorStyle = {
    color: 'red',
    border: '2px solid red'
  }

  return(
    <div style={errorStyle}>
      {errorMsg}
    </div>
  )
}

export default Error