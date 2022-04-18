import React, { useCallback, useContext, useState, useEffect} from "react";
import { useHttp } from "../hooks/http.hooks";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/authContext";
import { useMessage } from "../hooks/message.hook";
import { Create } from "../components/create";
import { Edit } from "../components/editroom";
export const Room = () => {
  useEffect(()=>{
    document.title = "Список комнат";
  });
  const [edit,setEdit] = useState(false);  
  const [id,setId] = useState('');
  const message = useMessage();
  const auth = useContext(AuthContext);
  const [rooms,setRooms] = useState([]);
  const {request,loading} = useHttp();
  const updateRooms = useCallback( (newRooms) => {
    setRooms(newRooms);
  },[setRooms]);
  const cancelHandler = useCallback(()=>{setEdit(false)},[setEdit]);
  const editHandler = useCallback((event)=>{
    setId(event.target.id);
    setEdit(true);
  },[setEdit]);
  const getRoom = useCallback(async()=>{
    try {
      const res = await request('/room/all','GET',null,{authorization:auth.token});
      setRooms(()=>{return res});
    } catch (error) {
      message(error);   
    }
  },[request,auth,message]);
  useEffect(()=>{
    getRoom();
  },[getRoom]);
  let rolles = auth.rolles==="admin";
  if (loading){
    return <Loader/>
  }
  return(<div className="main-vcs">
    <table>
      <tbody>
      <tr>
        <td className="center main-table">
          №
        </td>
        <td className="center main-table">
          Комната
        </td>
        <td className="center main-table">
          Пароль
        </td>
        <td className="center main-table">
          Министерство
        </td>
        {rolles ?
        <td className="center main-table">
          Изменить
        </td>:<div className="no-visual"></div>}
      </tr>
      {rooms.map((room,index)=>{
        return(
        <tr key={index}>
          <td className="center main-table">
            {index+1}
          </td>
          <td className="center main-table">
            {room.room}
          </td>
          <td className="center main-table">
            {room.password}
          </td>
          <td className="center break-text main-table">
            {room.admin}
          </td>
          { rolles ?
          <td className="center main-table">
          <a href="#edit" className="waves-effect waves-light btn-edit btn blue darken-2 del-button btn-main" onClick={editHandler} id={room._id}>
        Изменить</a>
          </td>:<td className="no-visual"></td>}
        </tr>)
      })}
      </tbody>
    </table>
    {rolles ?
    <div>
      <Create updateRooms={updateRooms}/>
      <Edit id={id} edit={edit} cancelHandler={cancelHandler} updateRooms={updateRooms}/>
      </div>
      :<td className="no-visual"></td>}
  </div>)
} 