import Card from 'react-bootstrap/Card';
import sprite from '../assets/images/icon/sprite_card.svg';

function BankCard ({ bankcard, isActive }) {   
    return (

         <Card>
            <Card.Body className={`cardBody ${isActive ? 'activeCard' : ''}`}>
                <div className='cardName'>
                    {bankcard.name}
                </div>
                <div className='cardBalance'>
                    ${bankcard.balance}
                </div>
                <div className='cardCopy'>
                    <div className='cardNumber'>
                        {bankcard.number}
                    </div>
                    <svg className='copySVG'>
                        <use href={`${sprite}#CopySimple`} />
                    </svg>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BankCard;