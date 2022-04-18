import React from "react";
import {Switch,Redirect,Route} from "react-router-dom";
import  Users  from "./pages/Users";
import { Arhiv } from "./pages/Arhiv";
import { Auth } from "./pages/AuthPages";
import { Main } from "./pages/Main";
import { Room } from "./pages/Room";
export const useRoutes = (isAuthenticated,rolle) =>{
  if (isAuthenticated){
    return(
      <Switch>
        <Route path="/room" exact>
        <Room/>
      </Route>
        <Route path="/arhiv">
          <Arhiv/>
        </Route>
        {
          rolle?
          <Route path="/users">
            <Users/>
          </Route>:null
        }
        
        <Route path="/" exact>
          <Main/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    )
  }
  return (
    <Switch>
      
      <Route path="/" exact>
        <Auth/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}