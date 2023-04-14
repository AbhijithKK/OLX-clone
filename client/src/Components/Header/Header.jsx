import React, { useContext, useEffect } from 'react';
import './Header.css';
import OlxLogo from '../../Assets/Olxlogo';
import Search from '../../Assets/Search';
import Arrow from '../../Assets/Arrow';
import SellButton from '../../Assets/SellButton';
import SellButtonPlus from '../../Assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Store/Context';
import axios from '../../axios';

function Header() {
  const navigate = useNavigate();
  const { user,refresh, search, setSearch, setRefresh } = useContext(AuthContext);

  useEffect(() => {
    
      // Refresh the header here
      console.log('hello');
  
  }, [refresh]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      axios.get('/logout')
        .then((response) => {
          
         return setRefresh(!refresh);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
  
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" value="India" readOnly />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user.login === true ? (
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={handleLogout}
            >
              {user.details.name}
            </Link>
          ) : (
            <Link style={{ textDecoration: 'none', color: 'black' }} to={'/login'}>
              <span>Login</span>
            </Link>
          )}

          <hr />
        </div>
        <Link to={'/sell'}>
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;