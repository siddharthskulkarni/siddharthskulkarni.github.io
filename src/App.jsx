import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Essays from './pages/Essays.jsx';
import EssayViewer from './pages/EssayViewer.jsx';
import About from './pages/About.jsx'
import Footer from './components/Footer.jsx';
import { AnalyticsProvider } from './components/Analytics';
import { RouterTracker } from './components/RouterTracker';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <AnalyticsProvider>
        <RouterTracker />
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="max-w-4xl mx-auto px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/math/essays" element={<Essays />} />
              <Route path="/misc/essays" element={<Essays />} />
              <Route path="/essays/:id" element={<EssayViewer />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </AnalyticsProvider>
      </Router>
    </>
  );
}

export default App;
