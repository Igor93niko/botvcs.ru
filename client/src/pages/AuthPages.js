import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";

export const Auth = ()=>{
  useEffect(()=>{
    document.title = "Страница авторизации";
  });
  const auth = useContext(AuthContext);
  const {request,error,clearError,loading} = useHttp();
  const [form,setForm] = useState({email:'',password:''});
  const message = useMessage();
useEffect(()=>{
  clearError();
},[error,clearError]);
  useEffect(()=>{
    window.M.updateTextFields();  
  },[]);
  const loginHandler = async()=>{
    try {
     const data = await request('/auth/login','POST',{...form});
     auth.login(data.token,data.id,data.rolles);
    } catch (error) {
      message(error.message);
    }
  }
  const changeHandler = event =>{
    setForm({...form,[event.target.name]:event.target.value});
  }
  const keyHandler = (key)=>{
    if (key.charCode===13){
      loginHandler();
    }
  }

  // const registerHandler = async()=>{
  //   try {
  //     const data = await request('/auth/register','POST',{...form});
  //     message(data.message);
  //    } catch (error) {
  //      console.log(error);
  //      message(error.message);
  //    }
  // }
  return (
  <div>
    <div className="main-auth">
    <div className="auth">
      <div className="card blue darken-2">
        <div className="card-content white-text auth-title">
          <span className="card-title  s6 offset-s3 title-main">Авторизация</span>
        </div>
        <div>
        <div className="input-field">
            <input 
            placeholder="Введите email" 
            id="email" 
            type="email" 
            name="email" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='email'>
              E-mail
            </label>
         </div>
         <div className="input-field">
            <input 
            placeholder="Введите пароль" 
            id="password" 
            type="password" 
            name="password" 
            className="yellow-input"
            onChange={changeHandler} 
            onKeyPress={keyHandler}
            />
            <label htmlFor="password">
              Пароль
            </label>
         </div>
         </div>
        <div className="card-action panel-create-auth">
          <button onClick={loginHandler} disabled={loading} className="btn waves-effect waves-light ">Войти</button>
          {/* <button onClick={registerHandler} disabled={loading} className="btn waves-effect waves-light">Регистрация</button> */}
        </div>
      </div>
    </div>
  </div>
  </div>)
}