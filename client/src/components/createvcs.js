import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";
import add from "../add.gif";

export const Create = (props)=>{
  const [create,setCreate] = useState(false);
  useEffect(()=>{
    window.M.updateTextFields();  
  },[create]);
  const auth = useContext(AuthContext);
  const message =useMessage();
  const {request} = useHttp();
  const fullDate = new Date();
  let date = fullDate.toLocaleDateString();
  let [d,m,y] = date.split('.');
  date = [y,m,d].join('-');
  let time = fullDate.toLocaleTimeString([],{timeStyle:'short'});
  const [data,setData] = useState({time,date,room:'',password:'',admin:'',place:''});
  const changeHandler = useCallback( event => {
      setData({...data,[event.target.id]:event.target.value});
  },[data]);
  const clickAddHandler = useCallback((event)=>{
    event.preventDefault();
    setCreate(!create);
    setData({time,date,room:'',password:'',admin:'',place:''});
   },[create,date,time]);

  const clickHandler = useCallback( async(event) => {
    event.preventDefault();
    try {
      const res = await request('/vcs/create','POST',data,{authorization:auth.token}); 
      if (res){
        message('Успешно добавили');
        setCreate(!create);
        props.updateVcs(res);
      } 
    } catch (error) {
      message(error.message);
    }
  
    
  },[request,data,message,auth,props,create]);
const [showmodal,setShowmodal] = useState('modal');
const [back,setBack] = useState('back');
const modalHandler = useCallback((event)=>{
  event.preventDefault();
  setShowmodal('modal show-modal');
  setBack('back back-visible');
},[]);
const closeModal = useCallback((event)=>{
  event.preventDefault();
  setShowmodal('modal');
  setBack('back');
},[]);
const [letter,setLetter] =useState('');
const editLetter = (event)=>{
  setLetter(event.target.value);
};
const parseLetter = (letter)=>{
  const arrayLetter = letter.split('\n');
  let ob = {};
  if (arrayLetter){
  arrayLetter.forEach(line=>{
    if (line.indexOf("Дата:")!==-1){
      let dateLine = line.split(' ');
      const day = dateLine[1];
      const year = dateLine[3];
      let month = 0;
      switch (dateLine[2]){
        case "января": {
          month = '01';
          break;
        }
        case "февраля": {
          month = '02';
          break;
        }
        case "марта": {
          month = '03';
          break;
        }
        case "апреля": {
          month = '04';
          break;
        }
        case "мая": {
          month = '05';
          break;
        }
        case "июня": {
          month = '06';
          break;
        }
        case "июля": {
          month = '07';
          break;
        }
        case "августа": {
          month = '08';
          break;
        }
        case "сентября": {
          month = '09';
          break;
        }
        case "октября": {
          month = '10';
          break;
        }
        case "ноября": {
          month = '11';
          break;
        }
        case "декабря": {
          month = '12';
          break;
        }
        default:{
          month = '0';
        }
      }
      
      ob.date = [year,month,day].join('-');
      ob.day = day;
      ob.year = year;
      ob.month = month;
    }
    if (line.indexOf('Время')!==-1){
      const arrayLine = line.split(' ');
      ob.time  = arrayLine[1];
    }
    if (line.indexOf('Комната ВКС')!==-1){
      const arrayLine = line.split(' ');
      ob.room = arrayLine[2].substr(0,5);
      if (line.indexOf('без пароля')!==-1){
        ob.password = '';
      }
      else{
        ob.password = arrayLine[4];
      }
    }
    if(line.indexOf('Тема')!==-1){
      ob.admin =  line.substr(5,line.length-5).trim();
    }
    ob.place = 'Большой зал';
  })}
  return(ob);
}

const pasteLetter = useCallback( event =>{
  event.preventDefault();
  const newDate = parseLetter(letter);
  setData({...data,
    'time':newDate.time,
    'date':newDate.date,
    'admin':newDate.admin,
  'day':newDate.day,
  'month':newDate.month,
  'year':newDate.year,
  'room':newDate.room,
  'password':newDate.password,
  'place':newDate.place
  });
  closeModal(event);
  setLetter('');
},[letter,closeModal,data] );
  if (create){
  return (
  <div className="create-main">
    <div className={back} onDoubleClick={closeModal}>

    </div>
    <div className={showmodal}>   
    <div className="modal-head">
      <h3  className="center modal-text">Вставьте текст сообщения</h3>
    </div>
    <div className="modal-body">
    <div className="input-field col s12">
          <textarea id="textarea1" 
          value={letter}
          onChange={editLetter}
          className="materialize-textarea"></textarea>
          <label htmlFor="textarea1">Сообщение</label>
        </div>
    </div>
    <div className="modal-footer">
    <a href="/" 
    onClick={closeModal} 
    className="waves-effect waves-light btn blue darken-2" >
      Отмена</a>
      <a href="/" 
      onClick={pasteLetter} 
      className="waves-effect waves-light btn blue darken-2 paste" >
      Вставить</a>

    </div>
    </div>
    <div className="input-field">
            <input 
            placeholder="Введите дату" 
            id="date" 
            type="date" 
            name="date" 
            className="yellow-input" 
            onChange={changeHandler}
            value={data.date}
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
            value={data.time}
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
            value={data.room}
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
            value={data.password}
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
            value={data.admin}
            type="text" 
            name="admin" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='admin'>
              Информация о ВКС
            </label>
    </div>
    <div className="input-field">
            <input 
            placeholder="Введите место" 
            id="place" 
            value={data.place}
            type="text" 
            name="place" 
            className="yellow-input" 
            onChange={changeHandler}
            />
            <label htmlFor='place'>
              Место
            </label>
    </div>
    <div className="panel-create">
      <div>
      <a href="/" 
      onClick={clickAddHandler} 
      className="waves-effect waves-light btn blue darken-2" >
      Отмена</a>
      <a href="/" 
      onClick={modalHandler} 
      className="waves-effect waves-light btn blue darken-2 paste" >
      Вставить</a>
      </div>
      <a href="/" 
      className="waves-effect waves-light btn blue darken-2" 
      onClick={clickHandler}>
      Создать</a>
    </div>
   
    
  </div>)}
  else{
    return(
      <div className="create">
        <a  href="/" 
        onClick={clickAddHandler}> 
        <img src={add} 
        className="add" 
        alt="Добавить"/>
      </a>
      </div>
    )
  }
}