import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useContext, useState } from 'react';
// Importing Pages 
import SignupScreen from './Pages/Students/Signup';
import TSignupScreen from './Pages/Tutors/TSignup';

// Importing contexts
import Context from './contexts/AuthContext';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Context>
          {/* Students */}
          <Route exact path='/student/signup' > <SignupScreen /> </Route>

          {/* Tutors */}
          <Route path='/tutor/signup'> <TSignupScreen />  </Route>
        </Context>
      </BrowserRouter>
    </div>
  );
}

export default App;
