import Accordion from 'react-bootstrap/Accordion';
import { faqData } from '../data/faqData';

function FAQ() {
  return (
    <Accordion defaultActiveKey="0" style={{ width: '700px', margin: '0 auto' }}>
      {faqData.map(({ id, question, answer }) => (
        <Accordion.Item eventKey={id} key={id}>
          <Accordion.Header>{question}</Accordion.Header>
          <Accordion.Body>{answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FAQ;
