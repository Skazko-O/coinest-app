import { useEffect, useState } from "react";


const CurrencyRates = () => {
    const [usdRate, setUsdRate] = useState(null);
    const [eurRate, setEurRate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.monobank.ua/bank/currency')
            .then((res) => res.json())
            .then((data) => {
                const usd = data.find(
                    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
                );
                const eur = data.find(
                    (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
                );
                setUsdRate(usd);
                setEurRate(eur);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading the course:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Downloading the exchange rate...</p>;

    return (
        <div className="d-flex align-items-center gap-3 flex-wrap">
            
            {usdRate && (
                <div className="d-flex align-items-center gap-1">
                    <div>USD/UAH</div>
                    <p> {usdRate.rateBuy} /</p>
                    <p> {usdRate.rateSell}</p>
                </div>
            )}
            {eurRate && (
                <div className="d-flex align-items-center gap-1">
                    <div>EUR/UAH</div>
                    <p> {eurRate.rateBuy} /</p>
                    <p> {eurRate.rateSell}</p>
                </div>
            )}
        </div>
    );
};

export default CurrencyRates;
