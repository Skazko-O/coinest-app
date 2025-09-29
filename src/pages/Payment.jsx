import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinanceBtn from '../components/FinanceBtn';
import RecentTransferList from '../components/RecentTransferList';
import TransferForm from '../components/TransferForm';
import ProviderList from '../components/ProviderList';

function Payment() {
    return (

        <Row>            
            <Col sm={3}>
                <FinanceBtn />
                <ProviderList />
            </Col>           
            <Col sm={9}>
                <Row>
                    <Col>
                        {/* <RecentTransferList /> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* <TransferForm /> */}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Payment;