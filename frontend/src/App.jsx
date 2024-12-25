import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import AddTool from './pages/AddTool';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/addtool' element={<AddTool />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
