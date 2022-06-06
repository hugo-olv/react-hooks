// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useState, useEffect } from 'react'

function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(
    window.localStorage.getItem('name') ?? initialName
  )

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
