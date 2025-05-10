import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Campaign from './components/Campaign';
import DonationForm from './components/DonationForm';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Header />
      <Campaign onSelectCampaign={setSelectedCampaign} />
      <DonationForm selectedCampaign={selectedCampaign} />
      <ContactSection />
      <Footer />
    </>
  );
}

function ContactSection() {
  return (
    <section
      id="contact-section"
      style={{
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginTop: '40px',
      }}
    >
      <h2>Contact Us</h2>
      <p>Have questions? Reach out to us anytime!</p>
      <p>Email: <a href="mailto:support@donate.com">support@donate.com</a></p>
      <p>Phone: +1 234 567 8900</p>
    </section>
  );
}

export default App;
