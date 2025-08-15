import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Essays from './pages/Essays.jsx';
import EssayViewer from './pages/EssayViewer.jsx';
import Bio from './pages/Bio.jsx'
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
          <main className="px-6 py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/math/essays" element={<Essays />} />
              <Route path="/misc/essays" element={<Essays />} />
              <Route path="/essays/:id" element={<EssayViewer />} />
              <Route path="/bio" element={<Bio />} />
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
