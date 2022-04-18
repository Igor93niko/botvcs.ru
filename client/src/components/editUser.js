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
  const [user,setUser] = useState({username:'',id:''});
  const id = props.id;
  const {request,loading} = useHttp();
  const clickAddHandler = useCallback((event)=>{
    event.preventDefault();
    props.cancelHandler();
   },[props]);
  const getRoom = useCallback(async()=>{
    if (id.length>0){
    try {
      let res = await request(`/users/${id}`,'GET',null,{authorization:auth.token});
      setUser(res);
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
    setUser({...user,[event.target.id]:event.target.value});
  }
  const clickHandler = useCallback( async event =>{
    event.preventDefault();
    try {
      const res = await request('/users/edit','POST',user,{authorization:auth.token}); 
      if (res){
        message('Успешно изменили');
        props.updateUsers(res);
        props.cancelHandler();  
      } 
    } catch (error) {
      message(error.message);
    }
  },[user,message,request,auth,props]);
  const clickDeleteHandler = useCallback(async (event) =>{
    event.preventDefault();
    try {
      const res = await request(`/users/delete/${id}`,'GET',null,{authorization:auth.token});
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
              id="username" 
              type="text" 
              name="username" 
              className="yellow-input" 
              onChange={changeHandler}
              value={user.username}
              />
              <label htmlFor='username'>
                Наименование
              </label>
      </div>
      <div className="input-field">
              <input 
              placeholder="Введите пароль" 
              id="id" 
              type="text" 
              name="id" 
              className="yellow-input" 
              value={user.id}
              onChange={changeHandler}
              />
              <label htmlFor='id'>
                ID
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
  