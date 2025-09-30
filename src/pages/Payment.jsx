import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinanceBtn from '../components/FinanceBtn';
import RecentList from '../components/RecentList';
import PaymentForm from '../components/PaymentForm';
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
                        <RecentList
                            title="Recent Payments"
                            dataUrl="data/payments.json"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PaymentForm />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Payment;