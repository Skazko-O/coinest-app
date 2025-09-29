import Card from 'react-bootstrap/Card';
import CircleBtn from './CircleBtn';

function RecentItemList({ transfer }) {
  if (!transfer) return null;
  
 const isSvgUse = transfer.avatar?.includes('#');
 const iconProps = isSvgUse
  ? { iconHref: transfer.avatar }
  : { imgSrc: transfer.avatar, alt: `${transfer.name} ${transfer.fname}` };

  return (

    <Card>
      <Card.Body>
        <div className='cardStyle d-flex align-items-center gap-3'>
          <CircleBtn {...iconProps} />

          <div className='infoGroup'>
            <div className='name'>
              <p>{transfer.name}</p><p>{transfer.fname}</p>
            </div>
            <div className='accountNo'>{transfer.id}</div>
          </div>

          <div className='balanceGroup'>
            <div className='balance'>${transfer.balance}</div>
            <div className={`status ${transfer.status.toLowerCase()}`}>{transfer.status}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecentItemList;