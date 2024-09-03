import React, { useState, useEffect, useCallback,useRef} from 'react';

function App() {
  const [count, setCount] = useState(10); // Set default length
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let Pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 0; i < count; i++) {
      Pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(Pass);
  }, [numberAllowed, charAllowed, count]);
   
  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  useEffect(() => {
    passwordGenerator();
  }, [count, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-400'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-md overflow-hidden mb-2'>
        <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3' 
          placeholder='Password'
          readOnly
          ref={inputRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='bg-blue-500 shrink-0 px-3 py-0.5 font-semibold text-sm outline-none'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range"
            min="1" 
            max="20" 
            value={count}
            className='cursor-pointer' 
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <label>Length: {count}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type="checkbox" 
            checked={numberAllowed} 
            id="numberAllowed" 
            className='form-checkbox'
            onChange={() => setNumberAllowed(prevState => !prevState)}
          />
          <label htmlFor="numberAllowed">Number</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type="checkbox" 
            checked={charAllowed} 
            id="charAllowed" 
            className='form-checkbox'
            onChange={() => setCharAllowed(prevState => !prevState)}
          />
          <label htmlFor="charAllowed">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
