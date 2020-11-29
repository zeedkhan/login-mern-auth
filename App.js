import './App.css';
import React, { useEffect, useState } from 'react'


function App() {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [nameErr, setNameErr] = useState(null)
  const [emailErr, setEmailErr] = useState(null)
  const [passwordErr, setPasswordErr] = useState(null)
  const [passwordErr2, setPasswordErr2] = useState(null)
  

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
      .then(res => {
        if (res.status === 200) {
          setShowLogin(true)
        } else {
          res.json().then(json => {
            const {name, email, password, password2} = json;
            setNameErr(name)
            setEmailErr(email)
            setPasswordErr(password)
            setPasswordErr2(password2)
          })
        }
      })
      console.log(newUserObject)
  }


  return (
    <div className="App">

      {showLogin ? ( <div> <h1>Let's login</h1></div>
      ) : 
    <div>
      <form>
        <h1>Sign Up</h1>
      {nameErr ? nameErr : null}
      Name: <input type="name" id="name" onChange={e => setName(e.target.value)} />
      <br/>
      {emailErr ? emailErr : null}
      Email :<input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
      <br/>
      {passwordErr ? passwordErr : null}
      Password: <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
      <br/>
      {passwordErr2 ? passwordErr2 : null}
      Confirm Password: <input type="password" id="password2" onChange={e => setPassword2(e.target.value)}/>
      <br/>
      <button onClick={register}>Register</button>  
      </form>
    </div> } 
    </div>
  );
}

export default App;
