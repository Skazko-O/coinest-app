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
  const [errors, setErrors] = useState({});


  useEffect(() => {
    fetch('data/accounts.json')
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(err => console.error('Failed to load accounts:', err));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCardId) newErrors.selectedCardId = 'Please select a card';
    if (!selectedRecipient) newErrors.selectedRecipient = 'Please choose a recipient';
    if (!amount || isNaN(amount) || Number(amount) <= 0) newErrors.amount = 'Enter a valid amount';
    if (!note.trim()) newErrors.note = 'Note is required';
    if (!checked) newErrors.checked = 'You must confirm the transfer';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast.error('Please fix the errors before submitting');
      return;
    }
    const payload = {
      cardId: selectedCardId,
      recipient: selectedRecipient,
      amount,
      method,
      note,
      checked,
    };
    showToast.success('The transfer has been successfully sent!');

    setSelectedCardId(null);
    setSelectedRecipient('');
    setAmount('');
    setNote('');
    setChecked(false);
    setErrors({});
  };

  return (
    <div className="outerWrapperBorder">
      <div className='headerSection'>
        <h3 className='headingSec'>Make a Payment</h3>
      </div>
      <Form className="customForm" onSubmit={handleSubmit}>
        <Form.Group className="cardWrapperForm pb-3" controlId="formGridCardNumber">
          <div className="cardScrollContainer">
            <BankCardList
              selectedCardId={selectedCardId}
              onSelect={(id) => setSelectedCardId(id)}
              cardClassName={`bankCardItem ${errors.selectedCardId ? 'is-invalid' : ''}`}
            />
            {errors.selectedCardId && (
              <div className="invalid-feedback d-block">{errors.selectedCardId}</div>
            )}
          </div>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRecipient" className="pb-3">
          <Form.Label className='headForm'>Service Provider</Form.Label>
          <Row className="g-3">
            <Col>
              <Form.Select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                isInvalid={!!errors.selectedRecipient}
              >
                <option value="">Choose...</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} {acc.fname}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.selectedRecipient}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                isInvalid={!!errors.selectedRecipient}
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
            <Form.Label className='headForm'>Virtual Account</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row style={{ marginBottom: '82px' }}>
          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label className='headForm'>Note</Form.Label>
            <Form.Control
              value={note}
              onChange={(e) => setNote(e.target.value)}
              isInvalid={!!errors.note}
            />
            <Form.Control.Feedback type="invalid">
              {errors.note}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group controlId="formGridCheckbox" className="mb-3">
          <Form.Check
            type="checkbox"
            label="I confirm the transfer"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            isInvalid={!!errors.checked}
            feedback={errors.checked}
            feedbackType="invalid"
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" type="button" onClick={() => console.log('Cancelled')}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Send Money
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TransferForm