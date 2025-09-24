import bankcard from '../data/bankcard.json';
import BankCard from "./BankCard";


function BankCardList() {
    return (<>
        <h4 className='headForm'>Payment Account</h4>
        <div className="outerWrapperBankCard">
            <div className="outerWrapperRawBankCard">
                {bankcard.map((acc) => (
                    <BankCard key={acc.id} bankcard={acc} />
                ))}
            </div>
        </div>
    </>
    );
}

export default BankCardList;


