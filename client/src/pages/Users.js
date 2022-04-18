import React, {useCallback, useEffect, useState, useContext} from 'react';
import { useHttp } from "../hooks/http.hooks";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/authContext";
import { useMessage } from "../hooks/message.hook";
import { Create } from "../components/createUsers"; 
import { Edit } from "../components/editUser";
const Users = () => {
  useEffect(()=>{
    document.title = "Список пользователей";
  });
  const [edit,setEdit] = useState(false);  
  const [id,setId] = useState('');
  const message = useMessage();
  const auth = useContext(AuthContext);
  const [users,setUsers] = useState([]);
  const {request,loading} = useHttp();
  const updateUsers = useCallback( (newUsers) => {
    setUsers(newUsers);
  },[setUsers]);
  const cancelHandler = useCallback(()=>{setEdit(false)},[setEdit]);
  const editHandler = useCallback((event)=>{
    setId(event.target.id);
    setEdit(true);
  },[setEdit]);
  const getUser = useCallback(async()=>{
    try {
      const res = await request('/users/all','GET',null,{authorization:auth.token});
      setUsers(()=>{return res});
    } catch (error) {
      message(error);   
    }
  },[request,auth,message]);
  useEffect(()=>{
    getUser();
  },[getUser]);
  if (loading){
    return <Loader/>
  }

  return (
    <div className="main-vcs">
      <table>
        <tbody >
        <tr >
          <td className="main-table num">
            №
          </td>
          <td className="main-table">
            Имя
          </td>
          <td className="main-table">
            ID
          </td>
          <td className="main-table">
            Изменить
          </td>
        </tr>
    {
      users.map((user,index)=>{
        return(<tr key={index}>
                  <td className="main-table num">
                              {index+1}
                            </td>
                            <td className="main-table">
                              {user.username}
                            </td>
                            <td className="main-table">
                              {user.id}
                            </td>
                            <td className="main-table">
                            <a href="#edit" className="waves-effect waves-light btn-edit btn blue darken-2 del-button btn-main" onClick={editHandler} id={user._id}>
        Изменить</a>
                            </td>
              </tr>)
      })
    }

        </tbody>
      </table>
      <div>
      <Create updateUsers={updateUsers}/>
      <Edit id={id} edit={edit} cancelHandler={cancelHandler} updateUsers={updateUsers}/>
      </div>
    </div>
  );
};

export default Users;