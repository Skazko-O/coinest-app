import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BlockBtn from './BlockBtn';
import BankCardList from './BankCardList';
import { showToast } from '../utils/toast';

function TransferForm() {
  const [accounts, setAccounts] = useState([]);
  const [activeType, setActiveType] = useState('Local');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [note, setNote] = useState('');
  const [checked, setChecked] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    fetch('data/accounts.json')
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(err => console.error('Failed to load accounts:', err));
  }, []);

  const handleCancel = (isManual = true) => {
    setSelectedCardId(null);
    setSelectedRecipient('');
    setAmount('');
    setMethod('');
    setNote('');
    setChecked(false);
    setActiveType('Local');
    setWasSubmitted(false);

    if (isManual) {
      showToast.info('Form has been reset');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasSubmitted(true);

    if (!selectedRecipient || !amount || !method || !checked) {
      showToast.error('Please fill in all required fields');
      return;
    }

    const payload = {
      recipient: selectedRecipient,
      amount,
      method,
      note,
      checked,
    };
    console.log('Submitting:', payload);
    showToast.success('The transfer has been successfully sent!');

    handleCancel(false);
  };

  const isInvalid = (value) => !value || value.trim() === '';

  return (
    <div className="outerWrapperBorder">
      <div className='headerSection'>
        <h3 className='headingSec'>Transfer Form</h3>
      </div>
      <Form className="customForm" onSubmit={handleSubmit}>
        <Row className="btnForm">
          <Form.Group as={Col}>
            <BlockBtn
              label="Local"
              isActive={activeType === 'Local'}
              onClick={() => setActiveType('Local')}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <BlockBtn
              label="International"
              isActive={activeType === 'International'}
              onClick={() => setActiveType('International')}
            />
          </Form.Group>
        </Row>

        <Form.Group className="cardWrapperForm pb-3" controlId="formGridCardNumber">
          <h4 className="headForm">Payment Account</h4>
          <div className="cardScrollContainer">
            <BankCardList
              selectedCardId={selectedCardId}
              onSelect={(id) => setSelectedCardId(id)}
              cardClassName="bankCardItem"
            />
          </div>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRecipient" className="pb-3">
          <Form.Label className={`headForm ${wasSubmitted && isInvalid(selectedRecipient) ? 'text-danger' : ''}`}>
            Select Recipient {wasSubmitted && isInvalid(selectedRecipient) && '*'}
          </Form.Label>
          <Form.Select
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
            isInvalid={wasSubmitted && isInvalid(selectedRecipient)}
          >
            <option value="">Choose...</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} {acc.fname}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a recipient
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} xs={2} controlId="formGridAmount">
            <Form.Label className={`headForm ${wasSubmitted && isInvalid(amount) ? 'text-danger' : ''}`}>
              Amount {wasSubmitted && isInvalid(amount) && '*'}
            </Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              isInvalid={wasSubmitted && isInvalid(amount)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter amount
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={10} controlId="formGridMethod">
            <Form.Label className={`headForm ${wasSubmitted && isInvalid(method) ? 'text-danger' : ''}`}>
              Transfer Method {wasSubmitted && isInvalid(method) && '*'}
            </Form.Label>
            <Form.Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              isInvalid={wasSubmitted && isInvalid(method)}
            >
              <option value="">Choose...</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Card Payment</option>
              <option value="crypto">Crypto</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a method
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridNote">
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
            id="customCheck"
            label={
              <span className={wasSubmitted && !checked ? 'text-danger' : ''}>
                Check me out for submit {wasSubmitted && !checked && '*'}
              </span>
            }
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            isInvalid={wasSubmitted && !checked}
            feedback="You must check this box"
            feedbackType="invalid"
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" type="button" onClick={() => handleCancel(true)}>
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

export default TransferForm;