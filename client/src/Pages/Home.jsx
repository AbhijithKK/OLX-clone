import React, { useEffect } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import { useState } from 'react';
import Posts from '../Components/Posts/Post';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
   setRefresh(!refresh)
   
  }, [refresh])
  
  return (
    <div className="homeParentDiv">
      <Header  refresh={refresh}/>
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;