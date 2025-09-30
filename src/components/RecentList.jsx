import { useEffect, useState } from "react";
import RecentItem from "./RecentItem";

function RecentList({ title , dataUrl } ) {
    const [transferData, setTransferData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(dataUrl)
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
    }, [dataUrl]);

    return (
        <div className="outerWrapperBorder">
            <div className='headerSection'>
                <h3 className='headingSec'>{title}</h3>
                <a href='#' className='showMore'>Show More</a>
            </div>
            <div className="outerWrapperRaw">
                {loading && <p>Loading transfers...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && transferData.map((acc) => (
                    <RecentItem key={acc.id} transfer={acc} />
                ))}
            </div>
        </div>
    );
}

export default RecentList;
