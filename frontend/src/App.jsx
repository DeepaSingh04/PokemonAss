// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



import React from 'react';
import SinglePokemon from './pages/SinglePokemon';
import './App.css';

function App() {
  return (
    <div className="App" style={{ 
      background: 'linear-gradient(135deg, #1a1b4b 0%, #162447 100%)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      color: '#ffffff',
      overflowX: 'hidden',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <SinglePokemon />
    </div>
  );
}

export default App;

