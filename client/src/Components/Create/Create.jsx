import React from 'react'
import './Create.css';
import Header from '../Header/Header';
import { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

function Create() {
const [name, setName] = useState('')
const [category, setCategory] = useState()
const [price, setPrice] = useState('')
const [description, setDescription] = useState('')
const [file, setFile] = useState('')
const [err, setErr] = useState('')
const navigate=useNavigate()
const handleSubmit=(e)=>{
  e.preventDefault();
  if(name.trim() && category.trim() && price.trim() && description.trim()){
    axios.post('/addProduct',{name,category,price,description,file},{headers: {
      'content-type': 'multipart/form-data'
  }}).then((response)=>{
    if(!response.data.err) return navigate('/')
    else return setErr('Something went wrong')
  })
  }else{
    setErr('All fields are required')
  }
}
  return (

    <>
    <Header />
    <card>
      <div className="centerDiv">
        <p style={{ height:'20px' }}>{err}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
           value={name}
           onChange={(e)=>setName(e.target.value)}
           required
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            required
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" value={price}
           onChange={(e)=>setPrice(e.target.value)}
           required /><br/>
           
            
            <label htmlFor="fname">Description</label><br/>
          
          <input className="input" type="text" value={description}
           onChange={(e)=>setDescription(e.target.value)} 
            required
          
           />
        
        <br />   
          <br />
          <input type="file" 
           onChange={(e)=>setFile(e.target.files[0])} />
          <br />
          <button type='submit' className="uploadBtn">upload and Submit</button>
        </form>
      </div>
    </card>
  </>
  )
}

export default Create
