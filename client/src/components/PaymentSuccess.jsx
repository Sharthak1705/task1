import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Alert } from 'react-bootstrap'; 
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    const savePaymentDetails = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/payment/save-payment', {
          session_id: sessionId,
        });
        console.log('Payment details saved:', response.data);
      } catch (error) {
        console.error('Error saving payment details:', error);
      }
    };

    if (sessionId) {
      savePaymentDetails(); 
    }
  }, [sessionId]);

  return (
    <Container style={{ textAlign: 'center', padding: '50px' }}>
      <Alert variant="success">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your payment has been successfully processed.</p>
      </Alert>
      <Button
        variant="success"
        onClick={() => navigate('/')}
        size="lg"
        style={{ marginTop: '20px' }}
      >
        Back to Home
      </Button>
    </Container>
  );
};
export default PaymentSuccess;


