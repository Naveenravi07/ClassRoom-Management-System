import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useContext, useEffect } from 'react';
// Importing Pages 
import SignupScreen from './Pages/Students/Signup';
import TSignupScreen from './Pages/Tutors/TSignup';
import GHome from './Pages/General/GHome';
import Main from './Pages/Students/Main';
import Login from './Pages/Students/Login';
import THomePage from './Pages/Tutors/THomePage';
import TLogin from './Pages/Tutors/TLogin';
import CreateAlliancePage from './Pages/Tutors/CreateAlliancePage';
import AlliancesPage from './Pages/Tutors/AlliancesPage';

// Importing contexts
import { AuthContext } from './contexts/AuthContext';
import { TutuorAuthContext } from './contexts/TutorAuthContext'

function App() {

  let { user, setUser } = useContext(AuthContext)
  let { tutor, setTutor } = useContext(TutuorAuthContext)
  useEffect(() => {

    setUser(localStorage.getItem("nova"))
    setTutor(localStorage.getItem("tutor"))
  }, [user, tutor])


  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'> <GHome /> </Route>
        {/* Students */}
        <Route exact path='/student'> <Main /> </Route>
        <Route path='/student/signup' > <SignupScreen /> </Route>
        <Route path='/student/login'> <Login /> </Route>

        {/* Tutors */}
        <Route exact path='/tutor'> <THomePage /> </Route>
        <Route path='/tutor/signup'> <TSignupScreen />  </Route>
        <Route path='/tutor/login'> <TLogin /> </Route>
        <Route path='/tutor/create-alliance'> <CreateAlliancePage /> </Route>
        <Route path='/tutor/alliances'> <AlliancesPage /> </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
