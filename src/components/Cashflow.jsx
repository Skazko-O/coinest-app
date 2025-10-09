import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

function Cashflow({ selectedYear, setSelectedYear, onTotalsChange }) {
  const [cashflowData, setCashflowData] = useState([]);

  useEffect(() => {
    fetch('data/cashflow.json')
      .then(response => response.json())
      .then(data => setCashflowData(data))
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  const handleSelect = (eventKey) => {
    setSelectedYear(eventKey);
  };

  const filteredData = cashflowData.filter(
    (item) => item.year === Number(selectedYear)
  );

  const sum = (arr, key) => arr.reduce((acc, item) => acc + item[key], 0);

  const currentData = cashflowData.filter(item => item.year === Number(selectedYear));
  const previousData = cashflowData.filter(item => item.year === Number(selectedYear) - 1);

  const currentIncome = sum(currentData, 'income');
  const currentExpense = sum(currentData, 'expense');
  const currentBalance = currentIncome - currentExpense;

  const previousIncome = sum(previousData, 'income');
  const previousExpense = sum(previousData, 'expense');
  const previousBalance = previousIncome - previousExpense;

  const calcTrend = (current, previous) => {
    if (!previous || previous === 0) return '0%';
    const diff = ((current - previous) / previous) * 100;
    const sign = diff >= 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}%`;
  };

  const trendIncome = calcTrend(currentIncome, previousIncome);
  const trendExpense = calcTrend(currentExpense, previousExpense);
  const trendBalance = calcTrend(currentBalance, previousBalance);

  useEffect(() => {
    if (typeof onTotalsChange === 'function') {
      onTotalsChange({
        totalIncome: currentIncome,
        totalExpense: currentExpense,
        totalBalance: currentBalance,
        trendIncome,
        trendExpense,
        trendBalance,
      });
    }
  }, [
    currentIncome,
    currentExpense,
    currentBalance,
    trendIncome,
    trendExpense,
    trendBalance,
    onTotalsChange,
  ]);


  const availableYears = Array.from(
    new Set(cashflowData.map((item) => item.year))
  )
    .sort((a, b) => b - a)
    .map(String);

  const chartData = filteredData.map(item => ({
    name: item.month.slice(0, 3),
    income: item.income,
    expense: -item.expense,
  }));

  return (
    <Card>
      <Card.Body>
        <div className="statisticHead">
          <h3 className='headingSec'>Cashflow</h3>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle className="customToggle" id="range">
              <span>{selectedYear}</span>
              <svg className="iconToggle" viewBox="0 0 24 24">
                <use xlinkHref="assets/images/icon/sidebar-icon.svg#AngleDown" />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availableYears.map(label => (
                <Dropdown.Item key={label} eventKey={label}>
                  {label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="statisticHead">
          <div>
            <div className="totalItem">Total Balance: </div>
            <div className="amount">
              {typeof currentBalance === 'number' ? currentBalance.toLocaleString() : '0'} $
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#1E4841' }}></div>
            <p className="small mb-0">Income</p>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#BBF49C' }}></div>
            <p className="small mb-0">Expense</p>
          </div>
        </div>

        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              stackOffset="sign"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#ccc" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#E5E6E6" />
              <Bar dataKey="income" fill="#1E4841" stackId="stack" />
              <Bar dataKey="expense" fill="#BBF49C" stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cashflow;