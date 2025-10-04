import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useTransData } from '../hooks/useTransData';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { useMemo, useState } from 'react';
import Table from 'react-bootstrap/Table';

function Statistic({ selectedYear }) {
    const {
        selectedMonth,
        setSelectedMonth,
        availableMonths,
        filteredTransactions,
        monthNames,
    } = useTransData(selectedYear);

    const [selectedType, setSelectedType] = useState('expence');
    const COLORS = ['#1E4841', '#BBF49C', '#54943cff', '#458181ff', '#29a567ff'];


    const pieData = useMemo(() => {
        const groups = {};

        filteredTransactions.forEach((tx) => {
            if (tx.type !== selectedType) return;

            const group = tx.name || 'Other';
            groups[group] = (groups[group] || 0) + tx.amount;
        });

        return Object.entries(groups).map(([name, value]) => ({ name, value }));
    }, [filteredTransactions, selectedType]);


    const { income, expence } = useMemo(() => {
        let income = 0;
        let expence = 0;

        filteredTransactions.forEach((tx) => {
            if (tx.type === 'income') {
                income += tx.amount;
            } else if (tx.type === 'expence') {
                expence += tx.amount;
            }
        });

        return { income, expence };
    }, [filteredTransactions]);


    const total = pieData.reduce((acc, item) => acc + item.value, 0);
    const sortedPieData = [...pieData].sort((a, b) => b.value - a.value);
    console.table(filteredTransactions);

    return (
        <Card>
            <Card.Body>
                <div className="statisticHead">
                    <h3 className="headingSec">Statistic</h3>
                    <Dropdown onSelect={(key) => {
                        setSelectedMonth(key === 'all' ? null : Number(key));
                    }}>
                        <Dropdown.Toggle className="customToggle" id="dropdown-basic">
                            {selectedMonth !== null
                                ? `${monthNames[selectedMonth]} ${selectedYear}`
                                : `All months`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="all">All months</Dropdown.Item>
                            {availableMonths.map((month) => (
                                <Dropdown.Item key={month} eventKey={month}>
                                    {monthNames[month]}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                </div>

                <div className="flexGroupSO">
                    <button
                        className={selectedType === 'income' ? 'active' : ''}
                        onClick={() => setSelectedType('income')}
                    >
                        Income  {`($${income.toLocaleString()})`}
                    </button>
                    <button
                        className={selectedType === 'expence' ? 'active' : ''}
                        onClick={() => setSelectedType('expence')}
                    >
                        Expence  {`($${expence.toLocaleString()})`}
                    </button>
                </div>

                <PieChart width={251} height={280}>
                    <Pie
                        data={pieData}
                        cx={125}
                        cy={140}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        <Label
                            // value={`${selectedType === 'income' ? 'Total Income:' : 'Total Expence:'} $${total}`}
                             value={`$${total}`}
                            position="center"
                            style={{ fontSize: '20px', fontWeight: '700', fill: 'var(--text-color)' }}
                        />

                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <Table striped bordered hover >                   
                    <tbody className="tableRawStyle">
                        {sortedPieData.map((group, index) => {
                            const percent = total > 0 ? ((group.value / total) * 100).toFixed(1) : '0.0';
                            const bgColor = COLORS[index % COLORS.length];
                            return (
                                <tr key={index}>
                                    <td>
                                        <div
                                            style={{
                                                backgroundColor: bgColor,
                                                color: '#fff',
                                                padding: '6px',
                                                borderRadius: '8px',
                                                textAlign: 'center',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {percent}%
                                        </div>
                                    </td>
                                    <td>{group.name}</td>
                                    <td>${group.value.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>


    );
}

export default Statistic;
