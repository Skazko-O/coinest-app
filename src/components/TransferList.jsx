import { useEffect, useState } from "react";
import BlockBtn from "./BlockBtn";
import CircleBtn from "./CircleBtn";
import ItemList from "./ItemList";
import SearchInput from "./SearchInput";

function TransferList() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("data/accounts.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch accounts");
                }
                return res.json();
            })
            .then((data) => {
                setAccounts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredAccounts = accounts.filter((acc) => {
        const fullName = `${acc.name} ${acc.fname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className="outerWrapper">
                <div className="searchGroup">
                    <SearchInput
                        placeholder="Search account"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <CircleBtn iconHref="assets/images/icon/sprite_groupbtn.svg#Sliders" />
                </div>
                <div className="outerWrapperCol">
                    {loading && <p>Loading accounts...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && filteredAccounts.map((acc) => (
                        <ItemList key={acc.id} account={acc} />
                    ))}
                    {!loading && !error && filteredAccounts.length === 0 && (
                        <p>No matching accounts found</p>
                    )}
                </div>
            </div>
            <BlockBtn isActive="true" />
        </div>
    );
}

export default TransferList;
