import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TransactionTable from '../components/Transactions';



function Transactions() {  
    return (
        <Row>
            <Col xl={12}>
                 <TransactionTable />
            </Col>                      
        </Row>
    );
}

export default Transactions;