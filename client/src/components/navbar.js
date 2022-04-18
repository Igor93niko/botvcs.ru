import React, { useCallback, useContext, useState } from "react";
import { NavLink,useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Navbar = () => { 
  const [active,setActive] = useState({Vcs:'active-nav',
  Room:'',
  Arhiv:'',
  User:''
});
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event)=>{
    event.preventDefault();
    auth.logout();
    history.push('/');
  }
  const clickHandler = useCallback( (event)=>{
    let newActive = {Vcs:'',
    Room:'',
    Arhiv:'',
    User:''
  };
    setActive({...newActive,[event.target.id]:'active-nav'});
  },[]);
  return(
    <nav>
      <div className="nav-wrapper card blue darken-2">
      <a href="/" className="brand-logo">Календарь ВКС</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink className={active.Vcs} to="/" id="Vcs" onClick={clickHandler}>ВКС</NavLink></li>
        <li><NavLink className={active.Room} to="/room" id="Room" onClick={clickHandler}>Комнаты</NavLink></li>
        <li><NavLink className={active.Arhiv} to="/arhiv" id="Arhiv" onClick={clickHandler}>Архив</NavLink></li>
        {auth.rolles==='admin'?<li><NavLink className={active.User} to="/users" id="User" onClick={clickHandler}> Пользователи</NavLink></li>:null}
        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
      </ul>
    </div>
    </nav>
  )
}