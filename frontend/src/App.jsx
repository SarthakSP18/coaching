import React from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminReg from './AdminReg';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import CoachReg from './CoachReg';
import CoachLogin from './CoachLogin';
import AtheleteReg from './AtheleteReg';
import AthleteLogin from './AtheleteLogin';
import HomePage from './HomePage';

const App = () => {
  return (

    <BrowserRouter>
      <Routes>

        <Route path='/adminregister' element={<AdminReg />}></Route>
        <Route path='/adminlogin' element={<AdminLogin />}></Route>
        <Route path='/admindashboard' element={<AdminDashboard />}></Route>
        <Route path='/coachregister' element={<CoachReg />}></Route>
        <Route path='/coachlogin' element={<CoachLogin />}></Route>
        <Route path='/atheleteregister' element={<AtheleteReg />}></Route>
        <Route path='/atheletelogin' element={<AthleteLogin />}></Route>
        <Route path='/' element={<HomePage />}></Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App;