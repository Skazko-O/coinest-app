import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WidgetCard from '../components/WidgetCard';
import CardStatisticList from '../components/CardStatisticList';
import CardStatistic from '../components/CardStatistic';
import FinanceBtn from '../components/FinanceBtn';



function Dashboard() {
  return (
    <Container>
      <Row>
        <Col sm={3}>
          <WidgetCard />
          <FinanceBtn />
        </Col>
        <Col sm={6}><CardStatisticList /></Col>
        <Col sm={3}>sm=3</Col>
      </Row>
    </Container>
  );
}

export default Dashboard;