import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BankCardList from './BankCardList';
import { showToast } from '../utils/toast';



function TransferForm() {
  const [accounts, setAccounts] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [note, setNote] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch('data/accounts.json')
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(err => console.error('Failed to load accounts:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      recipient: selectedRecipient,
      amount,
      method,
      note,
      checked,
    };
    console.log('Submitting:', payload);

    if (!selectedRecipient || !amount || !method || !checked) {
      showToast.error('Please fill in all required fields');
      return;
    }
    showToast.success('The transfer has been successfully sent!');

    setSelectedCardId(null);
    setSelectedRecipient('');
    setAmount('');
    setMethod('');
    setNote('');
    setChecked(false);
  };

  return (
    <div className="outerWrapperBorder">
      <div className='headerSection'>
        <h3 className='headingSec'>Make a Payment</h3>
      </div>
      <Form className="customForm" onSubmit={handleSubmit}>
        <Form.Group className="cardWrapperForm pb-3" controlId="formGridCardNumber">
          <BankCardList
            selectedCardId={selectedCardId}
            onSelect={(id) => setSelectedCardId(id)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRecipient" className="pb-3">
          <Form.Label className='headForm'>Service Provider</Form.Label>
           <Row className="g-3">
              <Col>
            <Form.Select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value="">Choose...</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} {acc.fname}
                </option>
              ))}
            </Form.Select>
            </Col>
            <Col>
            <Form.Select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value="">Choose...</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} {acc.fname}
                </option>
              ))}
            </Form.Select>
            </Col>
           </Row>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group controlId="formGridAmount">
            <Form.Label className='headForm'>Virual Account</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>          
        </Row>

        <Row style={{ marginBottom: '82px' }}>
          <Form.Group as={Col} controlId="formGridAmount">
            <Form.Label className='headForm'>Amount</Form.Label>
            <Form.Control
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
        </Row>        

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" type="button" onClick={() => console.log('Cancelled')}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Send Money
          </Button>
        </div>
      </Form>
    </div >
  );
}

export default TransferForm;