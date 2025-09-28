import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WidgetCard from '../components/WidgetCard';
import CardStatisticList from '../components/CardStatisticList';
import FinanceBtn from '../components/FinanceBtn';
import DailyLimit from '../components/DailyLimit';
import SavingPlans from '../components/SavingPlans';
import Cashflow from '../components/Cashflow';
import RecentTransactions from '../components/RecentTransactions';
import { useState } from 'react';

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  return (
    <Container>
      <Row>
        <Col sm={3}>
          <WidgetCard />
          <FinanceBtn />
          <DailyLimit />
          <SavingPlans />
        </Col>
        <Col sm={6}>
          <CardStatisticList />
          <Cashflow selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
          <RecentTransactions selectedYear={selectedYear} />
        </Col>
        <Col sm={3}>sm=3</Col>
      </Row>
    </Container>
  );
}

export default Dashboard;