import {useState,useCallback,useEffect} from 'react';
const storageName = 'userData';

export const useAuth = ()=>{
  const [ready, setReady] = useState(false);
  const [token,setToken] = useState(null);
  const [rolles,setRolles] = useState(null);
  const [userId,setUserId] = useState(null);
  const login = useCallback((jwtToken,id,rolle)=>{
    setToken(jwtToken);
    setUserId(id);
    setRolles(rolle);
    localStorage.setItem(storageName,JSON.stringify({userId:id,token:jwtToken,rolles:rolle}));
  },[]);
    
  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  },[]);
  
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token){
      login(data.token,data.userId,data.rolles);
    }
    setReady(true);
  },[login]);
  return {login,logout,token,userId,ready,rolles};
}