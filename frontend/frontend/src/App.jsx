import { useState } from 'react'

import './App.css';
import Login from "./Login.jsx";

import Dashboard from "./Dashboard.jsx";

function App() {
  const [email, setEmail] = useState("")
return (
    <>
     {!email ? (  <Login onLogin={setEmail} />) :
      ( <Dashboard email={email} />  )
      }
    </>
  );
}
export default App;
