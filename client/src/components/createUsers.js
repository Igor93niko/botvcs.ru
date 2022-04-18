import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";
import add from "../add.gif";
export const Create = (props)=>{
  const [create,setCreate] = useState(false);
  const clickAddHandler = useCallback((event)=>{
    event.preventDefault();
    setCreate(!create);
   },[create]);
  useEffect(()=>{
    window.M.updateTextFields();  
  },[create]);
  const auth = useContext(AuthContext);
  const message =useMessage();
  const {request} = useHttp();
  const [data,setData] = useState({username:'',id:''});
  const changeHandler = event => {
      setData({...data,[event.target.id]:event.target.value});
  };
  const clickHandler = useCallback( async(event) => {
    event.preventDefault();
    try {
      const res = await request('/users/create','POST',data,{authorization:auth.token});  
      if (res){
        setData({username:'',id:''});
        message('Успешно добавили');
        props.updateUsers(res);
        setCreate(!create);
      } 
    } catch (error) {
      message(error.message);
    }
  },[request,data,props,message,auth,create]);
  if (create){
  return (
  <div className="create-main">
  
    <div className="input-field">
            <input 
            placeholder="Введите комнату" 
            id="username" 
            type="text" 
            name="room" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='room'>
              Наименование
            </label>
    </div>
    <div className="input-field">
            <input 
            placeholder="Введите пароль" 
            id="id" 
            type="text" 
            name="password" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='password'>
              ID
            </label>
    </div>
    
    <div className="panel-create">
      <a href="/room" onClick={clickAddHandler} className="waves-effect waves-light btn blue darken-2" >
      Отмена</a>
      <a href="/" className="waves-effect waves-light btn blue darken-2" onClick={clickHandler}>
      Создать</a>
    </div>
   
    
  </div>)}
  else{
    return(
      <div className="create">
        <a  href="/" onClick={clickAddHandler}> 
        <img src={add} className="add" alt="Добавить"/>
      </a>
      </div>
    )
  }
}