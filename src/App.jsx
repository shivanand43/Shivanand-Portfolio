import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import Contact from './pages/Contact/Contact';
import styles from './App.module.css';
// import VisitorTracker from './components/VisitorTracker/VisitorTracker';
import Chatbot from './components/Chatbot/Chatbot';
import Admin from './pages/Admin/Admin';
export default function App() {
  return (
    <div className={styles.appWrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {/* <VisitorTracker /> */}
      <Chatbot />
      <Footer />
    </div>
  );
}