import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinanceBtn from '../../components/FinanceBtn';
import TransferList from '../../components/TransferList';
import RecentTransferList from '../../components/RecentTransferList';
import TransferForm from '../../components/TransferForm';

function Transfer() {
    return (

        <Row>            
            <Col sm={3}>
                <FinanceBtn />
                <TransferList />
            </Col>           
            <Col sm={9}>
                <Row>
                    <Col>
                        <RecentTransferList />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TransferForm />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Transfer;