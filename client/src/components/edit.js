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
  const [vcs,setVcs] = useState({date:'',time:'',room:'',password:'',admin:'',place:''});
  const id = props.id;
  const {request,loading} = useHttp();
  const clickAddHandler = useCallback((event)=>{
    event.preventDefault();
    props.cancelHandler();
   },[props]);
  const getVcs = useCallback(async()=>{
    if (id.length>0){
    try {
      let res = await request(`/vcs/${id}`,'GET',null,{authorization:auth.token});
      res.date = formatDate(res.date);
      setVcs(res);
    } catch (error) {
    console.log(error);    
    }
  }
  },[request,id,auth]);
  useEffect(()=>{
    if (edit)
    {
    getVcs();
    }
  },[getVcs,edit]);
  const message = useMessage();
  const changeHandler = event =>{
    setVcs({...vcs,[event.target.id]:event.target.value});
  }
  const clickHandler = useCallback( async event =>{
    event.preventDefault();
    try {
      const res = await request('/vcs/edit','POST',vcs,{authorization:auth.token}); 
      if (res){
        message('Успешно изменили');
        props.updateVcs(res);
        props.cancelHandler();  
      }
    } catch (error) {
      message(error.message);
    }
  },[vcs,message,request,auth,props]);
  const clickDeleteHandler = useCallback(async (event) =>{
    event.preventDefault();
    try {
      const res = await request(`/vcs/delete/${id}`,'GET',null,{authorization:auth.token});
        if (res){
          setVcs({date:'',time:'',room:'',password:'',admin:'',place:''});
          message('Успешно изменили');
          props.updateVcs(res);
          props.cancelHandler();  
        } 
    } catch (error) {
      message(error.message);
    }
  },[message,request,id,auth,props]);
  
  const formatDate=(date)=>{
    const [d,m,y] = date.split('.');
    const newDate = [y,m,d].join('-');
    return newDate
  }
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
              placeholder="Введите дату" 
              id="date" 
              type="date" 
              name="date" 
              className="yellow-input" 
              onChange={changeHandler}
              value={vcs.date}
              />
              <label htmlFor='date'>
                Дата
              </label>
      </div>
      <div className="input-field">
              <input 
              placeholder="Введите время" 
              id="time" 
              type="time" 
              name="time" 
              className="yellow-input" 
              onChange={changeHandler}
              value={vcs.time}
              />
              <label htmlFor='time'>
                Время
              </label>
      </div>
      <div className="input-field">
              <input 
              placeholder="Введите комнату" 
              id="room" 
              type="text" 
              name="room" 
              className="yellow-input" 
              onChange={changeHandler}
              value={vcs.room}
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
              value={vcs.password}
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
              value={vcs.admin}
              />
              <label htmlFor='admin'>
                Организатор
              </label>
      </div>
      <div className="input-field">
              <input 
              placeholder="Введите место" 
              id="place" 
              type="text" 
              name="place" 
              className="yellow-input" 
              onChange={changeHandler}
              value={vcs.place}
              />
              <label htmlFor='place'>
                Место
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