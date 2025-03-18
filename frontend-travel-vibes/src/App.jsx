import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreateTripForm from './CreateTripForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTripForm />} />
          <Route path="/search" element={<div>Search Page (Coming Soon)</div>} />
          <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
          {/* Add a catch-all route for undefined paths */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;