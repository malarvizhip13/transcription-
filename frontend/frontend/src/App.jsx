import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [email, setEmail] = useState("")
return (
    <>
     {!email ? (
        <Login onLogin={setEmail} />
      ) : (
        <Dashboard email={email} />
      )}
    </>
  );
}
export default App;
