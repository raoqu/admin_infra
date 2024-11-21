import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import BasicFlow from './pages/flow-editor/BasicFlow';
import CustomFlow from './pages/flow-editor/CustomFlow';
import BlankPage from './pages/data/BlankPage';
import TablePage from './pages/data/TablePage';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="data">
              <Route path="table" element={<TablePage />} />
              <Route path="blank" element={<BlankPage />} />
            </Route>
            <Route path="flow-editor">
              <Route path="basic" element={<BasicFlow />} />
              <Route path="custom" element={<CustomFlow />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
