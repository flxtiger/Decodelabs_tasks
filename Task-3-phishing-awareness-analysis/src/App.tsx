/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EmailAnalyzer from './pages/EmailAnalyzer';
import UrlAnalyzer from './pages/UrlAnalyzer';
import HeaderAnalyzer from './pages/HeaderAnalyzer';
import Learning from './pages/Learning';
import Quiz from './pages/Quiz';
import AboutDeveloper from './pages/AboutDeveloper';
import { AnalysisProvider } from './context/AnalysisContext';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <AnalysisProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze/email" element={<EmailAnalyzer />} />
            <Route path="/analyze/url" element={<UrlAnalyzer />} />
            <Route path="/analyze/headers" element={<HeaderAnalyzer />} />
            <Route path="/learn" element={<Learning />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/profile" element={<AboutDeveloper />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnalysisProvider>
  );
}
