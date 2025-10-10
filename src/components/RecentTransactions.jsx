import { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import SqearBtn from './SqearBtn';
import Table from 'react-bootstrap/Table';

function RecentTransactions({ selectedYear }) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const SortIcon = ({ active }) => (
    <svg className={`icon-xs ${active ? 'active' : ''}`} width="12" height="12">
      <use xlinkHref="assets/images/icon/sprite_card.svg#Sort" />
    </svg>
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('data/transactions.json');
      const data = await response.json();
      setAllTransactions(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
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

  const sortedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions];
    if (sortField) {
      sorted.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (sortField === 'datetime') {
          return sortDirection === 'asc'
            ? new Date(aVal) - new Date(bVal)
            : new Date(bVal) - new Date(aVal);
        }

        if (typeof aVal === 'string') {
          return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }
    return sorted;
  }, [filteredTransactions, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
                  : `All months`}
              </Dropdown.Toggle>
              {/* <SqearBtn iconHref="assets/images/icon/sprite_groupbtn.svg#Sliders" /> */}
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
          <thead className="tHead">
            <tr>
              <th onClick={() => handleSort('name')}>
                <div className="tableHeadStyle">
                  Transaction Name <SortIcon active={sortField === 'name'} />
                </div>
              </th>
              <th onClick={() => handleSort('datetime')}>
                <div className="tableHeadStyle">
                  Date & Time <SortIcon active={sortField === 'datetime'} />
                </div>
              </th>
              <th onClick={() => handleSort('amount')}>
                <div className="tableHeadStyle">
                  Amount <SortIcon active={sortField === 'amount'} />
                </div>
              </th>
              <th onClick={() => handleSort('note')}>
                <div className="tableHeadStyle">
                  Note <SortIcon active={sortField === 'note'} />
                </div>
              </th>
              <th onClick={() => handleSort('status')}>
                <div className="tableHeadStyle">
                  Status <SortIcon active={sortField === 'status'} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="tableRawStyle">
            {sortedTransactions.map((tx, index) => (
              <tr key={index}>
                <td className='colName'>{tx.name}</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>
                      {new Date(tx.datetime).toLocaleDateString('uk-UA', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                    <span>
                      {new Date(tx.datetime).toLocaleTimeString('uk-UA', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  </div>
                </td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>{tx.note}</td>
                <td>
                  <div className={`status ${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default RecentTransactions;