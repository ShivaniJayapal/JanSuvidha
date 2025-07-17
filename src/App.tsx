import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import UploadPage from './pages/UploadPage';
import RTIPage from './pages/RTIPage';
import ComparisonPage from './pages/ComparisonPage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 lg:ml-64">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/rti" element={<RTIPage />} />
                <Route path="/compare" element={<ComparisonPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;