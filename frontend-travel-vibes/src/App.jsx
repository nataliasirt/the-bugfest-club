import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholder routes for future pages */}
          <Route path="/form" element={<div>Form Page (Coming Soon)</div>} />
          <Route path="/search" element={<div>Search Page (Coming Soon)</div>} />
          <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
          <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;