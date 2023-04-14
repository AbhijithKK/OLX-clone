 
import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router,Navigate,Route, Routes } from 'react-router-dom'

import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import CreatePage from './Pages/Create';
import axios from '././axios';
import { useEffect,useContext } from 'react';
import  { AuthContext } from './Store/Context';
import ViewPost from './Pages/Viewpost';


function App() {
const {user,setUser,refresh,setRefresh} =useContext(AuthContext)  
useEffect(()=>{
  axios.get('/checkAuth').then((response)=>{
    setUser({login:response.data.logged,details:response.data.details})
    console.log(response.data);
  })
},[refresh])
  axios.defaults.withCredentials = true;
  return (
    <div >
      <Router>
        {user.login===false &&
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/view/:id' element={<ViewPost/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/sell' element={<Navigate to={'/login'}/>}/>
        </Routes>
        }
        {
          user.login===true&&
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Navigate to={'/'} />} />
          <Route path='/view/:id' element={<ViewPost/>} />
          <Route path='/signup' element={<Navigate to={'/'}/>} />
          <Route path='/sell' element={<CreatePage/>}/>
        </Routes>
        }
      </Router>
    </div>
  );
}

export default App;
