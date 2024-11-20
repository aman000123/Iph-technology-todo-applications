import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './pages/dashboard';
import Layout from './components/layout';

function App() {
  const token = localStorage.getItem('token'); // Check for token in localStorage

  return (
    <Routes>
      {/* If token exists, redirect to Dashboard, else show Login/Register */}

      <>
        {/* If token exists, route to dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </>
      {!token &&

        < Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

      }
    </Routes >
  );
}

export default App;
