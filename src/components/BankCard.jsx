import Card from 'react-bootstrap/Card';
import { showToast } from '../utils/toast';

function BankCard({ bankcard, isActive, className }) {
    return (

        <Card className={className} style={{ marginBottom: "0" }}>
            <Card.Body className={`cardBody ${isActive ? 'activeCard' : ''}`}>
                <div className='cardName'>
                    {bankcard.name}
                </div>
                <div className='cardBalance'>
                    ${bankcard.balance}
                </div>
                <div className='cardCopy'
                    onClick={() => {
                        navigator.clipboard.writeText(bankcard.number)
                            .then(() => {
                                showToast.success('Card number copied to clipboard!');
                            })
                            .catch(err => {
                                showToast.error('Failed to copy!');
                            });
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div className='cardNumber'>
                        {bankcard.number}
                    </div>
                    <svg className='copySVG'>
                        <use xlinkHref="assets/images/icon/sprite_card.svg#CopySimple" />
                    </svg>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BankCard;