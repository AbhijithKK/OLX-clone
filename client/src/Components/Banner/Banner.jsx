import React, { useContext, useEffect, useState } from 'react'
import './Banner.css';
import Arrow from '../../Assets/Arrow'
import axios from '../../axios';
import { AuthContext } from '../../Store/Context';

function Banner() {
  const [categy, setCategy] = useState([])
  const{setCategory}=useContext(AuthContext)
  useEffect(() => {
    axios.get('/getCategory').then((response)=>{
      console.log(response.data.categories[0]._id);
      setCategy(response.data.categories)
     })
  }, [])
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            
            <div>
              
            <select onClick={(event)=>{setCategory(event.target.value);
            axios.get('/getProduct')
            }}>
                 <option selected  disabled hidden >ALL CATEGORIES</option>
                 <option    value=''  >ALL</option>
                 {categy.map((items,index)=>{
               return (
                 <option value={items._id}>{items._id}</option>
                 );
              })}
            </select>
               
            </div>
          </div>
          <div  className="otherQuickOptions">
            {
            categy.map((items)=>{
              return(

                <span>{items._id}</span>
              )
            })
            }
          
          </div>
        </div>
        <div className="banner">
          <img
            src="https://github.com/Packapeer/React_tutorial_olx_clone/blob/main/public/Images/banner%20copy.png?raw=true"
            alt=""
          />
        </div>
      </div>
      
    </div>
  )
}

export default Banner
