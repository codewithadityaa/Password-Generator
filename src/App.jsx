import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)
  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()

  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-4 text-yellow-500 bg-gray-800'>
      <h1 className='text-white text-center my-2 p-6'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-9">
        <input type="text"
          color=''
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-6'>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label >Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setcharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
    </div>

  )
}

export default App
