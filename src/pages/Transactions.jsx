import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecentTransactions from '../components/RecentTransactions';


function Transactions() {  
    return (
        <Row>            
            <Col sm={12}>
                 <RecentTransactions selectedYear={2025} />
            </Col>                      
        </Row>
    );
}

export default Transactions;