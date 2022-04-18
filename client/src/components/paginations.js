import React, { useCallback, useEffect, useState } from "react";
import { NextActive } from "./paginations/nextActive";
import { NextDisabled } from "./paginations/nextDisabled";
import { PageActive } from "./paginations/pageActive";
import { PageDisabled } from "./paginations/pageDisabled";
import { PreviosActive } from "./paginations/previosActive";
import { PreviosDisabled } from "./paginations/previosDisabled";
import {Middle} from "./paginations/middle";
export const Paginations = (props) => {
  const [pages,setPages] = useState([]);
  const [start,setStart] = useState(false);
  const [finish,setFinish] = useState(false);
  const [activePages,setActivePages] = useState([]);
  const getPages = useCallback(()=>{
    let newPages = [];
    for(let i = 1;i<=props.number; i++){
      if (i===props.active){
        newPages.push(true);
        if (props.number>3){
          switch(i){
            case 1:setActivePages([{number:2,active:false},{number:3,active:false}]);
              if (props.number===4){
                setFinish(false)
              }
              else{
              setFinish(true);
              }
              setStart(false);
              break;
            case 2:  setActivePages([{number:2,active:true},{number:3,active:false}]);
              if (props.number===4){
                setFinish(false);
              }
              else{
                setFinish(true);
              }
              setStart(false);
              break;
            case props.number-1:setActivePages([{number:props.number-2,active:false},{number:props.number-1,active:true}]);
              if(props.number-1===3){
                setStart(false);  
              }
              else{
                setStart(true);
              }
              setFinish(false);
              break;
            case props.number:setActivePages([{number:props.number-2,active:false},{number:props.number-1,active:false}]);
              if (props.number===4){
                setStart(false);
              }
              else{
                setStart(true);
              }
              setFinish(false);
              break;
            default:
              setStart(true);
              setFinish(true);
              setActivePages([{number:i-1,active:false},{number:i,active:true},{number:i+1,active:false}]);
              if (i===3){
                setStart(false);
                if (i===props.number-2){
                  setFinish(false);
                }
                else{
                  setFinish(true);
                }
              }
              else{
                setStart(true);
                setFinish(true);
              }
              break;
          }
        }
        
      }
      else{
        newPages.push(false);
      }
    };
    if (props.number<4){
      setPages(newPages);
    }
  },[props.active,props.number]); 
  useEffect(()=>{
    getPages();
  },[getPages]);
  const first = (props.active===1);
  const last = (props.active===props.number);
  
  
  if (props.number>3){
  return(
    <div className="pagin">   
      <ul className="pagination">
      {first?<PreviosDisabled/>
      :<PreviosActive previosPage={props.previosPage}/>}
      {first?<PageActive number={1} />
      :<PageDisabled number={1} goPage={props.goPage}/>}
      {start?<Middle/>:<div className="no-visual"/>}
      {activePages.map((page,index)=>{
        return(
          page.active?<PageActive number={page.number} key={index+1}/>:<PageDisabled number={page.number} key={index+1} goPage={props.goPage}/>
          
        )
          })}
       {finish?<Middle/>:<div className="no-visual"/>}   
      {last?<PageActive number={props.number} />
      :<PageDisabled number={props.number} goPage={props.goPage}/>}
      {last?<NextDisabled/>:<NextActive nextPage={props.nextPage}/>}
    </ul>
    </div>
  )}
  else{
    if (props.number!==1){
    return(
      <div className="pagin">   
      <ul className="pagination">
      {first?<PreviosDisabled/>
      :<PreviosActive previosPage={props.previosPage}/>}
     
      {pages.map((page,index)=>{
        return(
          page?<PageActive number={index+1} key={index+1}/>:<PageDisabled number={index+1} key={index+1} goPage={props.goPage}/>
          
        )
          })}
      
      {last?<NextDisabled/>:<NextActive nextPage={props.nextPage}/>}
    </ul>
    </div>
    )
    }
    else return(<div className="no-visual"/>)
  }
}