import { useEffect, useState } from "react";
import RecentItemList from "./RecentItemList";

function RecentTransferList() {
    const [transferData, setTransferData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("data/transfer.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch transfer data");
                }
                return res.json();
            })
            .then((data) => {
                setTransferData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="outerWrapperBorder">
            <div className='headerSection'>
                <h3 className='headingSec'>Recent Transfer</h3>
                <a href='#' className='showMore'>Show More</a>
            </div>
            <div className="outerWrapperRaw">
                {loading && <p>Loading transfers...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && transferData.map((acc) => (
                    <RecentItemList key={acc.id} transfer={acc} />
                ))}
            </div>
        </div>
    );
}

export default RecentTransferList;
