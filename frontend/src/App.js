import React, {useEffect, useState} from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof backendData.users === 'undefined')? (
        <p>Loading...</p>
      ):(
      backendData.users.map((users, i) => (
          <p key={i}>{users}</p>
        ))
      )}


    </div>
  )
}

export default App