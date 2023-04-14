import React, { useState } from 'react'
import Logo from '../../olx-logo.png';
import './Signup.css';
import axios from '../../axios'
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [errMsg, setErrMsg] = useState('')
  const naigate=useNavigate()
const [name, setName] = useState('')
const [email, setEmail] = useState()
const [number, setNumber] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState('')
const handleSubmit=(e)=>{
  e.preventDefault();
  if(name.trim()&&email.trim()&&number.trim()&&password.trim()){
    axios.post('/userSignup',{name,email,number,password}).then((response)=>{
      console.log(response.data);
      if(response.data.err===false){
        naigate('/login')
      }else{
        setErrMsg(response.data.message ? response.data.message:'signup error')
      }
    })
  }else{
    setErr('All fields are required')
  }
}
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <p>{errMsg}</p>
        <p>{err}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <Link style={{ textDecoration:'none' }} to={'/login'}>
        Login
      </Link>
        
      </div>
    </div>
  )
}

export default Signup
