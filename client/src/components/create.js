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
  const [data,setData] = useState({room:'',password:'',admin:''});
  const changeHandler = event => {
      setData({...data,[event.target.id]:event.target.value});
  };
  const clickHandler = useCallback( async(event) => {
    event.preventDefault();
    try {
      const res = await request('/room/create','POST',data,{authorization:auth.token});  
      if (res){
        setData({room:'',password:'',admin:''});
        message('Успешно добавили');
        props.updateRooms(res);
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
            id="room" 
            type="text" 
            name="room" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='room'>
              Комната
            </label>
    </div>
    <div className="input-field">
            <input 
            placeholder="Введите пароль" 
            id="password" 
            type="text" 
            name="password" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='password'>
              Пароль
            </label>
    </div>
    <div className="input-field">
            <input 
            placeholder="Введите организатора" 
            id="admin" 
            type="text" 
            name="admin" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='admin'>
              Организатор
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