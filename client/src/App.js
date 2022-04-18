import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/authContext';
import 'materialize-css';
import { Navbar } from './components/navbar';
import { Loader } from './components/Loader';
import { Footer } from './components/footer';


function App() {
  const {token,userId,login,logout,ready,rolles} = useAuth();
  const isAuth = !!token;
  const rolle = (rolles==='admin');
  const router = useRoutes(isAuth,rolle);
  if (!ready){
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{
      token,
      userId,
      rolles,
      login,
      logout,
      isAuth
    }}>
    <Router>
      {isAuth && <Navbar/>}
      <div className="container">
        {router}
      </div>
      {isAuth && <Footer/>}
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
