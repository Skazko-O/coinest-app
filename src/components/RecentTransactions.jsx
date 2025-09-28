import { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import SqearBtn from './sqearBtn';
import Table from 'react-bootstrap/Table';



function RecentTransactions({ selectedYear }) {
    const [allTransactions, setAllTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const SortIcon = () => (
        <svg className="icon-xs" width="12" height="12">
            <use xlinkHref="/assets/images/icon/sprite_card.svg#Sort" />
        </svg>
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data/transactions.json');
            const data = await response.json();
            setAllTransactions(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log('selectedYear changed:', selectedYear);
        setSelectedMonth(null);
    }, [selectedYear]);


    const availableMonths = useMemo(() => {
        const monthsSet = new Set();
        const year = Number(selectedYear);
        allTransactions.forEach((tx) => {
            const date = new Date(tx.datetime);
            if (date.getFullYear() === year) {
                monthsSet.add(date.getMonth());
            }
        });
        return Array.from(monthsSet).sort((a, b) => a - b);
    }, [allTransactions, selectedYear]);

    const filteredTransactions = useMemo(() => {
        const year = Number(selectedYear);
        return allTransactions.filter((tx) => {
            const date = new Date(tx.datetime);
            return (
                date.getFullYear() === year &&
                (selectedMonth === null || date.getMonth() === selectedMonth)
            );
        });
    }, [allTransactions, selectedYear, selectedMonth]);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];



    return (
        <Card>
            <Card.Body>
                <div className="statisticHead">
                    <h3 className="headingSec">Recent Transactions</h3>
                    <Dropdown>
                        <div className="flexGroup">
                            <Dropdown.Toggle className="customToggle" id="dropdown-basic">
                                {selectedMonth !== null
                                    ? `${monthNames[selectedMonth]} ${selectedYear}`
                                    : `Select Month`}
                            </Dropdown.Toggle>
                            <SqearBtn iconHref="../.././assets/images/icon/sprite_groupbtn.svg#Sliders" />
                        </div>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                active={selectedMonth === null}
                                onClick={() => setSelectedMonth(null)}
                            >
                                All months {selectedYear}
                            </Dropdown.Item>
                            {availableMonths.map((monthIndex) => (
                                <Dropdown.Item
                                    key={monthIndex}
                                    onClick={() => setSelectedMonth(monthIndex)}
                                >
                                    {monthNames[monthIndex]} {selectedYear}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th><div className="tableHeadStyle" >Transaction Name <SortIcon /></div></th>
                            <th><div className="tableHeadStyle" >Date & Time <SortIcon /></div></th>
                            <th><div className="tableHeadStyle" >Amount <SortIcon /></div></th>
                            <th><div className="tableHeadStyle" >Note <SortIcon /></div></th>
                            <th><div className="tableHeadStyle" >Status <SortIcon /></div></th>
                        </tr>
                    </thead>
                    <tbody className="tableRawStyle">
                        {filteredTransactions.map((tx, index) => (
                            <tr key={index}>
                                <td>{tx.name}</td>
                                <td>{new Date(tx.datetime).toLocaleString()}</td>
                                <td>${tx.amount.toFixed(2)}</td>
                                <td>{tx.note}</td>
                                <td>{tx.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default RecentTransactions;