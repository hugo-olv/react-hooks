// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect, useRef, useState } from 'react'

const useLocalStorageState = ({
  key,
  defaultValue = '',
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) => {
  // I added this check to prevent the use of the hook when the key is not provided
  // otherwise the localStorage will use undefined as key.
  if (typeof key === 'undefined') throw Error('You must provide a key to useLocalStorageState')

  const [item, setItem] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    // We check if we already have a record in localStorage at the provided key.
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    // If we don't have a record we use the defaultValue. 
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(item))
  }, [key, item, serialize])

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
