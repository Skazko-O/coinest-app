import Card from 'react-bootstrap/Card';


function RecentTransactions() {
    return (

        <Card>
            <Card.Body>
                <div className="statisticHead">
                    <h3 className='headingSec'>Recent Transactions</h3>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="range">
                            {selectedYear}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="This Year">This Year</Dropdown.Item>
                            {availableYears.map(year => (
                                <Dropdown.Item key={year} eventKey={String(year)}>
                                    {year}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RecentTransactions;