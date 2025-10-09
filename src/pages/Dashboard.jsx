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
import Statistic from '../components/Statistic';

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    trendIncome: '0%',
    trendExpense: '0%',
    trendBalance: '0%',
  });

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
          <CardStatisticList
            totals={{
              totalIncome: totals.totalIncome,
              totalExpense: totals.totalExpense,
              totalBalance: totals.totalBalance,
            }}
            trends={{
              income: totals.trendIncome,
              expense: totals.trendExpense,
              balance: totals.trendBalance,
            }}
          />
          <Cashflow
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onTotalsChange={setTotals}
          />
          <RecentTransactions selectedYear={selectedYear} />
        </Col>
        <Col sm={3}>
          <Statistic selectedYear={selectedYear} />
        </Col>
      </Row>
    </Container>
  );
}


export default Dashboard;