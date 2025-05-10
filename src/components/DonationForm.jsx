import React, { useState, useEffect } from 'react';
import './DonationForm.css';
// Import Stripe elements
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Replace with your own Stripe publishable key for testing
const stripePromise = loadStripe('pk_test_51MxxxxxYourTestKeyHere');

function CheckoutForm({ campaign }) {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setAmount('');
    setCustomAmount('');
    setName('');
    setEmail('');
    setRecurring(false);
    setErrorMessage('');
    setPaymentSuccess(false);
  }, [campaign]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!stripe || !elements) {
      return;
    }

    let donationAmount = amount === 'custom' ? customAmount : amount;
    donationAmount = parseFloat(donationAmount);
    if (!donationAmount || donationAmount <= 0) {
      setErrorMessage('Please enter a valid donation amount.');
      return;
    }
    if (!name || !email) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    setProcessing(true);

    // Create payment method via Stripe Elements
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setProcessing(false);
      return;
    }

    // For demo: simulate payment processing delay and success
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      cardElement.clear();
    }, 1500);

    // In production, send paymentMethod.id and other info to your backend to create payment intent and confirm payment securely.
  };

  return (
    <div className="donation-form-container" id="donation-form">
      <h2>Make a Donation {campaign ? `for "${campaign.title}"` : ''}</h2>
      {paymentSuccess ? (
        <div className="success-message">
          Thank you for your generous donation!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Donation Amount:
            <select
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setCustomAmount('');
              }}
              required
            >
              <option value="" disabled>
                Select Amount
              </option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="custom">Custom Amount</option>
            </select>
          </label>
          {amount === 'custom' && (
            <input
              type="number"
              min="1"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              required
            />
          )}
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="recurring-label">
            <input
              type="checkbox"
              checked={recurring}
              onChange={() => setRecurring(!recurring)}
            />
            Make this a recurring donation
          </label>
          <label>
            Card Details:
            <CardElement options={{ hidePostalCode: true }} />
          </label>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" disabled={!stripe || processing}>
            {processing ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function DonationForm({ selectedCampaign }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm campaign={selectedCampaign} />
    </Elements>
  );
}
