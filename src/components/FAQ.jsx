import Accordion from 'react-bootstrap/Accordion';
import { faqData } from '../data/faqData';

function FAQ() {
  return (
    <div className="container">
      <Accordion defaultActiveKey="0" className="mx-auto w-100 w-md-75">
        {faqData.map(({ id, question, answer }) => (
          <Accordion.Item eventKey={id} key={id}>
            <Accordion.Header>{question}</Accordion.Header>
            <Accordion.Body>{answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQ;
