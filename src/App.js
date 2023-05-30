import { useEffect, useState } from 'react';
import './App.css';
import Form1 from './components/Form';
import Welcome from './components/Welcome';

function App() {
  const [login,setLogin]=useState(false);
  useEffect(()=>{
    console.log("hii")
     if(localStorage.getItem("Token")){
     setLogin(true)
     }
     else{
     setLogin(false)
     }
  },[])
  return (
    <div>
      {!login && <Form1 setLogin={setLogin} />}
      {login &&  <Welcome /> }
    </div>
  );
}

export default App;
