import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function FinanceBtn() {
  return (
    <div className='group-style'>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" className=" text-xs btn-icon-text">
          <svg className="icon-xs">
            <use xlinkHref="/src/assets/images/icon/sprite_groupbtn.svg#CoinOut" />
          </svg>
          Transfer</Button>
          <div className='divider'></div>
        <Button variant="secondary" className=" text-xs btn-icon-text">
          <svg className="icon-xs">
            <use xlinkHref="/src/assets/images/icon/sprite_groupbtn.svg#CreditCard" />
          </svg>
          Payment</Button>
          <div className='divider'></div>
        <Button variant="secondary" className=" text-xs btn-icon-text">
          <svg className="icon-xs">
            <use xlinkHref="/src/assets/images/icon/sprite_groupbtn.svg#VirtualAccount" />
          </svg>
          Virtual ACC</Button>
          <div className='divider'></div>
        <Button variant="secondary" className=" text-xs btn-icon-text">
          <svg className="icon-xs">
            <use xlinkHref="/src/assets/images/icon/sprite_groupbtn.svg#PlusSquare" />
          </svg>
          Top Up</Button>
      </ButtonGroup>
    </div>
  );
}

export default FinanceBtn;