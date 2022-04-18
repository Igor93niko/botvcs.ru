import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";
export const Edit = (props)=>{
  const auth = useContext(AuthContext);
  const [edit,setEdit] = useState(props.edit);
  useEffect(()=>{
    setEdit(props.edit);
  },[props]);
  const [room,setRoom] = useState({room:'',password:'',admin:''});
  const id = props.id;
  const {request,loading} = useHttp();
  const clickAddHandler = useCallback((event)=>{
    event.preventDefault();
    props.cancelHandler();
   },[props]);
  const getRoom = useCallback(async()=>{
    if (id.length>0){
    try {
      let res = await request(`/room/${id}`,'GET',null,{authorization:auth.token});
      setRoom(res);
    } catch (error) {
    console.log(error.message);    
    }
  }
  },[request,id,auth]);
  useEffect(()=>{
    getRoom();
  },[getRoom]);
  const message = useMessage();
  const changeHandler = event =>{
    setRoom({...room,[event.target.id]:event.target.value});
  }
  const clickHandler = useCallback( async event =>{
    event.preventDefault();
    try {
      const res = await request('/room/edit','POST',room,{authorization:auth.token}); 
      if (res){
        message('Успешно изменили');
        props.updateRooms(res);
        props.cancelHandler();  
      } 
    } catch (error) {
      message(error.message);
    }
  },[room,message,request,auth,props]);
  const clickDeleteHandler = useCallback(async (event) =>{
    event.preventDefault();
    try {
      const res = await request(`/room/delete/${id}`,'GET',null,{authorization:auth.token});
        if (res){
          message('Успешно изменили');
          props.updateVcs(res);
          props.cancelHandler();  
        } 
    } catch (error) {
      message(error.message);
    }
  },[message,request,id,auth,props]);
  useEffect(()=>{
    if (!loading){
      window.M.updateTextFields();  
    } 
  },[loading,edit])
  if (edit){
    return(
      <div id='edit'>
      <div className="input-field">
              <input 
              placeholder="Введите комнату" 
              id="room" 
              type="text" 
              name="room" 
              className="yellow-input" 
              onChange={changeHandler}
              value={room.room}
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
              value={room.password}
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
              value={room.admin}
              />
              <label htmlFor='admin'>
                Организатор
              </label>
      </div>
      <div className="panel-create">
      <a href="/" className="waves-effect waves-light btn-edit btn #e53935 redbtn darken-1 " onClick={clickDeleteHandler}>
        Удалить</a>
      <div>
      <a href="/" onClick={clickAddHandler} className="waves-effect waves-light btn-edit btn blue darken-2 del-button" >
        Отменить</a>
      <a href="/" className="waves-effect waves-light btn-edit btn blue darken-2" onClick={clickHandler}>
        Изменить</a>
      </div>

      </div>


      </div>
    )
  }
  else{
    return(<div id='edit'></div>);
  }}
  