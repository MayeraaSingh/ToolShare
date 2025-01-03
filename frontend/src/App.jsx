import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { populateUserFromCookie } from './redux/userSlice';
import Home from './pages/Home';
import AddTool from './pages/AddTool';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import BorrowedTools from './pages/borrowedTools';
import RegisteredTools from './pages/registeredTools';
import ReviewedTools from './pages/reviewedTools';
import Manageprofile from './pages/Manageprofile';
import SearchResultsPage from './pages/SearchResults';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Populate the user state from the cookie on app load
    dispatch(populateUserFromCookie());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/addtool' element={<AddTool />} />
        <Route path='/register' element={<Register />} />
        <Route path='/borrowed' element={<BorrowedTools />} />
        <Route path='/reviewed' element={<ReviewedTools />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/registered' element={<RegisteredTools />} />
        <Route path='/manage-profile' element={<Manageprofile />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
