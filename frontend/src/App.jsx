import React, { useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { populateUserFromCookie } from './redux/userSlice';
import Home from './pages/Home';
import AddTool from './pages/AddTool';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import BorrowedTools from './pages/BorrowedTools';
import RegisteredTools from './pages/RegisteredTools';
import ReviewedTools from './pages/ReviewedTools';
import Manageprofile from './pages/Manageprofile';
import SearchResultsPage from './pages/SearchResults';
import Tool from './pages/Tool';

// Error Boundary to catch and display render errors instead of white screen
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught a render error:', error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'red' }}>
          <h2>Something went wrong while rendering the app.</h2>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.info?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log('[App] Module loaded');

export default function App() {
  const dispatch = useDispatch();
  console.log('[App] Rendering App component');

  useEffect(() => {
    console.log('[App] useEffect fired – dispatching populateUserFromCookie');
    // Populate the user state from the cookie on app load
    dispatch(populateUserFromCookie());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/addtool' element={<AddTool />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/borrowed' element={<BorrowedTools />} />
          <Route path='/reviewed' element={<ReviewedTools />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/registered' element={<RegisteredTools />} />
          <Route path='/manage-profile' element={<Manageprofile />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/tool/:toolId" element={<Tool />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
