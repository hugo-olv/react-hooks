// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect } from 'react'

function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') ?? initialName,
  )

  // I went a little too fast over the 2 previous exercises.
  // and I already added the effect dependencies in the useEffect hook.
  // So here what it should be for the previous exs :
  // useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // })

  // And here what it should be now : 
  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  const handleChange = e => {
    setName(e.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
