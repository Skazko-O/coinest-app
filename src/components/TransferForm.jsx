import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BlockBtn from './BlockBtn';
import BankCardList from './BankCardList';

function TransferForm() {
  const [accounts, setAccounts] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [note, setNote] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch('/data/accounts.json')
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
  };

  return (
    <div className="outerWrapperBorder">
      <div className='headerSection'>
        <h3 className='headingSec'>Recent Transfer</h3>
      </div>
      <Form className="customForm" onSubmit={handleSubmit}>
        <Row className="btnForm">
          <Form.Group as={Col}>
            <BlockBtn label="Local" />
          </Form.Group>
          <Form.Group as={Col}>
            <BlockBtn label="International" variant="warning" />
          </Form.Group>
        </Row>
        <Form.Group className="cardWrapperForm pb-3" controlId="formGridCardNumber">
          <BankCardList
            selectedCardId={selectedCardId}
            onSelect={(id) => setSelectedCardId(id)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRecipient" className="pb-3">
          <Form.Label className='headForm'>Select Recipient</Form.Label>
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
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} xs={2} controlId="formGridAmount">
            <Form.Label className='headForm'>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={10} controlId="formGridMethod">
            <Form.Label className='headForm'>Transfer Method</Form.Label>
            <Form.Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Card Payment</option>
              <option value="crypto">Crypto</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAmount">
            <Form.Label className='headForm'>Note</Form.Label>
            <Form.Control
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Check me out for submit"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
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
    </div >
  );
}

export default TransferForm;