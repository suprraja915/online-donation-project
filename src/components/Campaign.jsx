import React from 'react';
import './Campaign.css';

const campaigns = [
  {
    id: 'education',
    title: 'Education for All',
    description: 'Support underprivileged children with education resources.',
    image: '/images/education.jpg'
  },
  {
    id: 'medical',
    title: 'Medical Aid',
    description: 'Help provide free medical services to those in need.',
    image: '/images/medical.jpg'
  },
  {
    id: 'hunger',
    title: 'Hunger Relief',
    description: 'Provide meals to families struggling with food insecurity.',
    image: '/images/hunger.jpg'
  }
];

export default function Campaign({ onSelectCampaign }) {
  const handleDonateClick = (campaign) => {
    if (onSelectCampaign) {
      onSelectCampaign(campaign);
    }
    const el = document.getElementById('donation-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="campaign-container" id="campaigns-section">
      <h2>Active Campaigns</h2>
      <div className="campaigns">
        {campaigns.map(item => (
          <div className="campaign-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => handleDonateClick(item)}>Donate Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}