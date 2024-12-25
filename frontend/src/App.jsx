import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import AddTool from './pages/AddTool';
import Explore from './pages/Explore';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='explore' element={<Explore />}></Route>
        <Route path='addtool' element={<AddTool />}></Route>
        <Route path='sign-up' element={<SignUp/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
