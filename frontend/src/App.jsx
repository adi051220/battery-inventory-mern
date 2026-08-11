import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddBattery from './pages/AddBattery';
import EditBattery from './pages/EditBattery';
import Report from './pages/Report';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddBattery />} />
          <Route path="/edit/:id" element={<EditBattery />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
  );
}

export default App;