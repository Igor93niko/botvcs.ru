import React, { useEffect, useState, useContext }  from "react";
import { useHttp } from "../hooks/http.hooks";
import { useCallback } from "react";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/authContext";
import { useMessage } from "../hooks/message.hook";
import { Create } from "../components/createvcs";
import { Edit } from "../components/edit";


export const Main = ()=>{
  useEffect(()=>{
    document.title = "Календарь ВКС";
  });
const [green,setGreen] = useState(false);
const [texttoday,setTexttoday] = useState("ВКС сегодня");
const [textup,setTextup] = useState("Накладки");
const [red,setRed] = useState(false);
const [backred,setBackred] = useState('');
const [backgreen,setBackgreen] = useState('');
const [count,setCount] = useState(0);
const [redArr,setRedArr] = useState([]);
const [greenArr,setGreenArr] = useState([]);
const [distoday,setDistoday] = useState(true);
const [disup,setDisup] = useState(true);
const date = new Date();
const day = (date.getDate()<10)?'0'+date.getDate():date.getDate();
const month = ((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):(date.getMonth()+1);
const year = date.getFullYear();
const today = [day,month,year].join('.');
const [edit,setEdit] = useState(false);  
const [id,setId] = useState('');
const message = useMessage();
const auth = useContext(AuthContext);
const [vcs,setVcs] = useState([]);
const [showgreen,setShowgreen] = useState('Показать');
const [showred,setShowred] = useState('Показать');
const {request,loading} = useHttp();
const cancelHandler = useCallback(()=>{setEdit(false)},[setEdit]);
const editHandler = useCallback((event)=>{
  setId(event.target.id);
  setEdit(true);
},[setEdit]);
const updateColor = useCallback( (res)=>{
  let countToday = 0;
  let up = true;
  let newGreenArr = [];
  let newRedGreenArr = [];
  res.forEach(vcs => {
    if ((vcs.room.indexOf('555')!==-1)&&(vcs.room.length===5)){
      vcs.link = true;
    }
    else{
      vcs.link = false;
    }
    if (today===vcs.date){
      newGreenArr.push(backgreen);
      countToday+=1;
    }
    else 
    {
      newGreenArr.push('white');
  }
  let one = true;
  let exit = true;
  res.forEach(all=>{
    if(((all.date===vcs.date)&&(all.time===vcs.time))&&exit){
      if (one){
        one = false;
      }
      else{
        exit = false;
      }
    }
  });
  if (!exit){
    newRedGreenArr.push(backred);
    up = false;
  }
  else{
    newRedGreenArr.push('');
  }
  });
  setDisup(up);
  if (up){
    setTextup('Накладок нет');
  }
  else{
    setTextup('Накладки');
  }
  setRedArr(newRedGreenArr);
  setGreenArr(newGreenArr);
  setCount(countToday);
  if (countToday!==0){
    setDistoday(false);
    setTexttoday('ВКС сегодня');
  }
  else{
    setDistoday(true);
    setTexttoday('Сегодня нет');
  }
},[backgreen,backred,today]);
const updateVcs = useCallback ((newVcs)=>{
  updateColor(newVcs);  
  setVcs(newVcs);
},[updateColor]);
const checkHandler = useCallback((event)=>{
  if (event.target.id==='green'){
    setGreen(event.target.checked);
    if (event.target.checked){
      setBackgreen('green');
      setShowgreen('Скрыть');
    }
    else{
      setBackgreen('');
      setShowgreen('Показать');
    }
  }
  else{
    setRed(event.target.checked);
    if (event.target.checked){
      setBackred(' red');
      setShowred('Скрыть');
    }
    else{
      setBackred('');
      setShowred('Показать');
    }
  }
},[]);
// const getVcs = useCallback(async()=>{
//     try {
//       let res = await request('/vcs/all','GET',null,{authorization:auth.token});
//       setVcs(res);
//   } catch (error) {
//     message(error);   
//   }
  
// },[request,auth,message]);
useEffect(()=>{
  console.log(1)
  const getVcs = (async()=>{
    try {
      let res = await request('/vcs/all','GET',null,{authorization:auth.token});
      setVcs(res);
  } catch (error) {
    message(error);   
  }
  
});
getVcs();
},[auth.token,message,request]); 
useEffect(()=>{
  updateColor(vcs);
},[vcs,updateColor,count]);

let rolles = auth.rolles==="admin";
if (loading){
  return <Loader/>
}
  return (
    <div className="main-vcs">
      
      <h3 className="center">Количество ВКС сегодня: {count}</h3>
      <table>
        <tbody >
        <tr >
          <td className="main-table num">
            №
          </td>
          <td className="main-table">
            Дата
          </td>
          <td className="main-table">
            Время
          </td>
          <td className="main-table">
            Комната
          </td>
          <td className="main-table">
            Пароль
          </td>
          <td className="main-table">
            Информация о ВКС
          </td>
          <td className="main-table">
            Место проведения
          </td>
          {rolles ? 

              <td className="main-table">
              Перенести
            </td>
            :<td className="no-visual"></td>
          }
         
        </tr>
        {vcs.map((vcs,index)=>{
          return (       
          <tr key={index+1} >
          <td className={"main-table num "+ greenArr[index]+redArr[index]} >{index+1}</td>
          <td className={"main-table " +greenArr[index]+redArr[index]}>{vcs.date}</td>
          <td className={"main-table "+greenArr[index]+redArr[index]}>{vcs.time}</td>
            {vcs.link?
            <td className={"main-table break-text "+greenArr[index]+redArr[index]} >
            <a href={'https://cms.gov74.ru/ru-RU/meeting/'+vcs.room} target="_blank" rel="noreferrer">{vcs.room}</a>
            </td>
            :<td className={"main-table break-text "+greenArr[index]+redArr[index]} >{vcs.room}</td>}
            
          <td className={"main-table break-text "+greenArr[index]+redArr[index]}>{vcs.password}</td>
          <td className={"main-table break-text "+greenArr[index]+redArr[index]}>{vcs.admin}</td>
          <td className={"main-table "+greenArr[index]+redArr[index]}>{vcs.place}</td>
          {rolles ? 
          <td className={"main-table "+greenArr[index]+redArr[index]}><a href="#edit" onClick={editHandler} className="waves-effect waves-light btn blue darken-2 btn-main" id={vcs._id} >
      Изменить</a></td>
      :<td className="no-visual"></td>
    }
          </tr>)
        })}
        </tbody>
      </table>
      <div className="legend">
      <table>
        <tbody><tr><td className="green legend-color"></td>
        <td>
            <p>
          <label>
            <input type="checkbox" 
            disabled={distoday}
            id={'green'}
            checked={green} 
            onChange={checkHandler}/>
            <span className="show">{showgreen}</span>
          </label>
        </p>
        </td>
        <td className="center">{texttoday}</td></tr></tbody>
      </table>
      <table>
        <tbody><tr><td className="red legend-color"></td>
        <td><p>
          <label>
            <input type="checkbox" 
            id={'red'}
            disabled={disup}
            checked={red} 
            onChange={checkHandler}/>
            <span className="show">{showred}</span>
          </label>
        </p></td><td className="center">{textup}</td></tr></tbody>
      </table>
      
      </div>
      
      {rolles ?
      <div>
      <Create updateVcs={updateVcs} />
      <Edit id={id} edit={edit} cancelHandler={cancelHandler} updateVcs={updateVcs}/>
      </div>
    :<div></div>}
      </div>)

}