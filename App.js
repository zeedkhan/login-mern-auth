import './App.css';
import React, { useEffect, useState } from 'react'


function App() {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  
  // const onInputChange = e => {
  //   setName({[e.target.id]: e.target.value})
  //   setEmail({[e.target.id]: e.target.value})
  //   setPassword({[e.target.id]: e.target.value})
  //   setPassword2({[e.target.id]: e.target.value})
  // }

  const api = "http://localhost:5000"
  
  const register = () => {

      const newUserObject = {
        name: name,
        email: email,
        password: password,
        password2: password2
      }

      fetch( api + "/api/users/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newUserObject)})
      .then(res => res.json()).then(json => {console.log(json)})

      console.log(newUserObject)
  }


  return (
    <div className="App">
      <h1>LOGIN</h1>
      <input type="name" id="name" onChange={e => setName(e.target.value)} />
      <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
      <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
      <input type="password" id="password2" onChange={e => setPassword2(e.target.value)}/>
      <button onClick={register}></button>
    </div>
  );
}

export default App;
