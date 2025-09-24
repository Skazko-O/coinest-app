import Card from 'react-bootstrap/Card';

function ItemList({ bankcard }) {
    if (!bankcard) return null;
    return (

        <Card>
            <Card.Body>
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
                        <use xlinkHref="/src/assets/images/icon/sprite_card.svg#CopySimple" />
                    </svg>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ItemList;