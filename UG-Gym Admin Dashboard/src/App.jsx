import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Users from './pages/Users';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="content ml-64 mt-16 p-6 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}