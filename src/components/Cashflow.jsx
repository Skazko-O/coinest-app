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

function Cashflow({ selectedYear, setSelectedYear }) {   
    const [cashflowData, setCashflowData] = useState([]);

    useEffect(() => {
        fetch('/data/cashflow.json')
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
                                <use xlinkHref="./assets/images/icon/sidebar-icon.svg#AngleDown" />
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
                            {filteredData.reduce((acc, item) => acc + (item.income - item.expense), 0).toLocaleString()} $
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
    )
}

export default Cashflow;



