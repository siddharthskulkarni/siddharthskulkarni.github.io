import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Essays from './pages/Essays.jsx';
import EssayViewer from './pages/EssayViewer.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 ">
          <Navbar />
          <main className="px-6 py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/essays" element={<Essays />} />
              <Route path="/essays/:id" element={<EssayViewer />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
