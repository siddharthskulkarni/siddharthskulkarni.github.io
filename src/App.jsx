import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Essays from './pages/Essays';
import EssayViewer from './pages/EssayViewer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Navbar />
          <main className="px-6 py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/essays" element={<Essays />} />
              <Route path="/essays/:id" element={<EssayViewer />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
