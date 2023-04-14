import axios from '../../axios';
import React, { useState, useContext } from 'react'
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext} from '../../Store/Context';

function Login() {
  const {setRefresh,refresh}=useContext(AuthContext)
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [err, setErr] = useState('')
 const navigate=useNavigate();
 
const handleSubmit=(e)=>{
    e.preventDefault();
    if(email.trim()&&password.trim()){
          axios.post('/userLogin',{email,password}).then((response)=>{
            if(!response.data.err){
              setRefresh(!refresh)
            } 
            else return setErr(response.data.message)
      })
    }else{
      setErr('All fields are required')
    }
}

  return (
    <div>
    <div className="loginParentDiv">
      <img width="200px" height="200px" alt='' src={Logo}></img>
      <p style={{ height:'20px' }}>{err}</p>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="lname">Password</label>
        <br />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type='submit'>Login</button>
      </form>
      <Link style={{ textDecoration:'none' }} to={'/signup'}>
        Signup 
      </Link>
    </div>
  </div>
  )
}

export default Login
