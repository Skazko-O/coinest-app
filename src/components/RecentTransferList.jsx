import transfer from '../data/transfer.json';
import RecentItemList from "./RecentItemList";


function RecentTransferList() {
    return (<>       
            <div className="outerWrapperBorder">
                <div className='headerSection'>
                    <h3 className='headingSec'>Recent Transfer</h3>
                    <a href='#' className='showMore'>Show More</a>
                </div>
                <div className="outerWrapperRaw">
                    {transfer.map((acc) => (
                        <RecentItemList key={acc.id} transfer={acc} />
                    ))} 
                </div>
            </div>        
    </>
    );
}

export default RecentTransferList;


