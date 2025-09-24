import Card from 'react-bootstrap/Card';

function WidgetCard() {
    return (
        <Card>
            <Card.Body className="widgetCard">
               
                    <div className="cardHeader">
                        <img className="symbol" src="src/assets/images/icon/symbol.svg" />
                        <img className="union" src="src/assets/images/icon/union.svg" />
                    </div>
                    <div className="cardName">Oleksandr Skazko</div>
                    <div className="cardFooter">
                        <div className="balanceGroup">
                            <div className="cardText">Balance Amount</div>
                            <div className="cardBalance">$562,000</div>
                        </div>
                        <div className="secUnit">
                            <div>
                                <div className="cardText">EXP</div>
                                <div className="cardSecurValue">11/29</div>
                            </div>
                            <div>
                                <div className="cardText">CVV</div>
                                <div className="cardSecurValue">323</div>
                            </div>
                        </div>
                    </div>               
            </Card.Body>
        </Card>
    )
}

export default  WidgetCard;