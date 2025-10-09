import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CircleBtn from './CircleBtn';

function RecentItem({ transfer }) {
  const [iconMap, setIconMap] = useState([]);
  const [iconHref, setIconHref] = useState(null);

  if (!transfer) return null;

  const isPerson = transfer.name && transfer.fname;


  useEffect(() => {
    fetch('data/providers.json')
      .then((res) => res.json())
      .then((data) => setIconMap(data))
      .catch((err) => console.error('Failed to load icon map:', err));
  }, []);


  useEffect(() => {
    if (isPerson) {
      setIconHref(transfer.avatar);
    } else {
      const match = iconMap.find((entry) =>
        entry.companies.includes(transfer.companies)
      );
      setIconHref(match?.iconHref || 'assets/images/icon/sprite_card.svg#Default');
    }
  }, [iconMap, transfer, isPerson]);


  const isSvgUse = iconHref?.includes('#');
  const iconProps = isSvgUse
    ? { iconHref }
    : { imgSrc: iconHref, alt: isPerson ? `${transfer.name} ${transfer.fname}` : transfer.companies };


  return (
    <Card
      onClick={() => onClick(account)}
      className="clickableCard"
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <div className='cardStyle d-flex align-items-center gap-3'>
          <CircleBtn {...iconProps} />

          <div className='infoGroup'>
            <div className='name'>
              {isPerson ? (
                <>
                  <p>{transfer.name}</p>
                  <p>{transfer.fname}</p>
                </>
              ) : (
                <p>{transfer.companies}</p>
              )}
            </div>
            <div className='accountNo'>{transfer.id}</div>
          </div>

          <div className='balanceGroup'>
            <div className='balance'>
              ${isPerson ? transfer.balance : transfer.bill}
            </div>
            <div className={`status ${transfer.status?.toLowerCase()}`}>
              {transfer.status}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecentItem;
