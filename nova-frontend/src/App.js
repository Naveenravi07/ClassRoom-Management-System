import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { useContext, useState } from 'react';
// Importing Pages 
import SignupScreen from './Pages/Students/Signup';
import TSignupScreen from './Pages/Tutors/TSignup';
import GHome from './Pages/General/GHome';
import Main from './Pages/Students/Main';

// Importing contexts
import Context from './contexts/AuthContext';
function App() {

  return (
    <div>
      <Context>
        <BrowserRouter>

          <Route exact path='/'> <GHome /> </Route>
          {/* Students */}
          <Route exact path='/student'> <Main /> </Route>
          <Route path='/student/signup' > <SignupScreen /> </Route>

          {/* Tutors */}
          <Route path='/tutor/signup'> <TSignupScreen />  </Route>


        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
