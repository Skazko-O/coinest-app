// src/components/PlaceholderPage.jsx
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/PlaceholderPage.scss';

export default function PlaceholderPage({ title = 'Coming Soon', description = 'This page is under construction.' }) {
  const navigate = useNavigate();

  return (
    <div className="placeholder-wrapper">
      <div className="placeholder-icon">        
        <img src="assets/images/underConstr.png" alt="Page Under Construction" />
      </div>
      <h2>{title}</h2>
      <p className='mb-3'>{description}</p>
      <Button variant="outline-primary" onClick={() => navigate('/')}>
        Back to Dashboard
      </Button>
    </div>
  );
}
