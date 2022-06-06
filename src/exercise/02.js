// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect, useState } from 'react'

const useLocalStorageState = ({ key, defaultValue = '' }) => {
  const [item, setItem] = useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  useEffect(() => {
    window.localStorage.setItem(key, item)
  }, [key, item])

  return [item, setItem]
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState({ key: 'name', defaultValue: initialName })

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
