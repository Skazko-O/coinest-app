import { useEffect, useState } from "react";
import BankCard from './BankCard';

function BankCardList({ selectedCardId, onSelect, cardClassName }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('data/bankcard.json')
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  return (
    <>
      
      <div className="outerWrapperBankCard">
        <div className="outerWrapperRawBankCard">
          {cards.map((card) => (
            <div
              key={card.id}              
              className={cardClassName}
              onClick={() => onSelect(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(card.id)}
            >
              <BankCard bankcard={card} isActive={selectedCardId === card.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default BankCardList;