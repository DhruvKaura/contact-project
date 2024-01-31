import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

const App = () => {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route exact path={'/'} Component={()=><Home/>}/>
        <Route  path={'/add'} Component={()=><AddContact/>}/>
        <Route  path={'/edit/:id'}Component={()=><EditContact/>} />
      </Routes>
    </div>
  );
}

export default App;
