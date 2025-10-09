import Card from 'react-bootstrap/Card';
import CircleBtn from './CircleBtn';

function ItemList({ account, onClick }) {
  if (!account) return null;
  return (

    <Card
      onClick={() => onClick(account)}
      className="clickableCard"
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <div className='cardStyle'>
          <CircleBtn imgSrc={account.avatar} alt={`${account.name} ${account.fname}`} />
          <div className='infoGroup'>
            <div className='name'>
              <p>{account.name}</p><p>{account.fname}</p>
            </div>
            <div className='accountNo'>{account.id}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemList;