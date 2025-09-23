import accounts from '../data/accounts.json';
import BlockBtn from "./BlockBtn";
import CircleBtn from "./CircleBtn";
import ItemList from "./ItemList";
import SearchInput from "./SearchInput";

function TransferList() {
    return (<>
        <div className="searchGroup">
            <SearchInput placeholder="Search account" />
            <CircleBtn iconHref="../../src/assets/images/icon/sprite_groupbtn.svg#Sliders" />
        </div>
        <div class="outerWrapper">
            <div className="transferList">
                {accounts.map((acc) => (
                    <ItemList key={acc.id} account={acc} />
                ))}
            </div>
            <BlockBtn />
        </div>
    </>
    );
}

export default TransferList;


