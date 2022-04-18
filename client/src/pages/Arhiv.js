import React, { useEffect, useState, useContext }  from "react";
import { useHttp } from "../hooks/http.hooks";
import { useCallback } from "react";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/authContext";
import { useMessage } from "../hooks/message.hook";
import { Paginations } from "../components/paginations";
export const Arhiv = ()=>{
const [active,setActive] =useState(1);
const [numberOnePage,setNumberOnePage] = useState(10);
const message = useMessage();
const auth = useContext(AuthContext);
const [numberPage,setNumberPage] = useState(1);
const [countPage,setCountPage] = useState(0);
const [allvcs,setAllvcs] = useState([]);
const [vcs,setVcs] = useState([]);
const {request,loading} = useHttp();
const changeHandler = (event)=>{
  setActive(1);
  setNumberOnePage(event.target.value);
}
useEffect(()=>{
  document.title = "Архив";
});
const getVcs = useCallback(async()=>{
  try {
    const res = await request('/arhiv/all','GET',null,{authorization:auth.token});
    setAllvcs(res);
  } catch (error) {
    message(error);    
  }
},[request,auth,message]);
const getPageVcs = useCallback(()=>{
  if (allvcs[0]&&active){
    let inputvcs = []
    for(let i=(active-1)*numberOnePage;i<active*numberOnePage;i++){
      if (allvcs[i]){
        inputvcs.push(allvcs[i]);
      }
  }
  setVcs(inputvcs);
  }
  },[active,allvcs,numberOnePage]);
  useEffect(()=>{getPageVcs()},[getPageVcs,active]);
const getNumber = useCallback(()=>{
  let count = 0;
  allvcs.forEach(()=>{
    count++;
  });
  setNumberPage(Math.ceil(count/numberOnePage));
  setCountPage(count);
},[allvcs,numberOnePage])

useEffect(()=>{
  getNumber();
},[getNumber]);

useEffect(()=>{
  getVcs();
},[getVcs])
const nextPage = useCallback((event)=>{
  event.preventDefault();
  if (active<numberPage){
    const newactive = active+1;
    setActive(newactive);
  }
  },[active,numberPage]);
  const goPage = useCallback((num)=>{
    setActive(num)
  },[])
  const previosPage = useCallback((event)=>{
    event.preventDefault();
    if (active>1){
      const newactive = active-1;
      setActive(newactive);
    }
    },[active]); 
if (loading){
  return (
  <Loader/>
  )
}
  return (
    <div>
    <div className="main-vcs">
      <div className="number">
       <div className="select-container"> 
      <label>Отображать по:</label>
       <select className="select input-field col s12" value={numberOnePage} onChange={changeHandler}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          </div>    
      </div>
      <table>
        <tbody >
        <tr >
          <td className="main-table">
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
            Организатор
          </td>
        </tr>
        {vcs.map((vcs,index)=>{
          return (
          <tr key={index+1}>
          <td className="main-table">{(active-1)*numberOnePage+index+1}</td>
          <td className="main-table">{vcs.date}</td>
          <td className="main-table">{vcs.time}</td>
          <td className="main-table break-text" >{vcs.room}</td>
          <td className="main-table break-text">{vcs.password}</td>
          <td className="main-table break-text">{vcs.admin}</td>
          </tr>)
        })}
        </tbody>
      </table>
      <Paginations count={countPage} 
      number={numberPage} 
      active={active} 
      nextPage={nextPage}
      previosPage={previosPage}
      goPage={goPage}/>
      </div>
      </div>
      )
}