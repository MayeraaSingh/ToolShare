import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import AddTool from './pages/AddTool';
import Explore from './pages/Explore';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='explore' element={<Explore />}></Route>
        <Route path='addtool' element={<AddTool />}></Route>
        <Route path='sign-up' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
