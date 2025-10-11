import { useEffect, useState } from "react";


const CurrencyRates = () => {
    const [usdRate, setUsdRate] = useState(null);
    const [eurRate, setEurRate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lastFetchDate = localStorage.getItem('currencyFetchDate');
        const today = new Date().toISOString().split('T')[0];

        if (lastFetchDate === today) {
            const cachedRates = localStorage.getItem('currencyRates');
            if (cachedRates) {
                const { usd, eur } = JSON.parse(cachedRates);
                setUsdRate(usd);
                setEurRate(eur);
                setLoading(false);
                return;
            }
        }
        fetch('https://api.monobank.ua/bank/currency')            
            .then((res) => res.json())
            .then((data) => {
                const usd = data.find(
                    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
                );
                const eur = data.find(
                    (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
                );

                localStorage.setItem('currencyFetchDate', today);
                localStorage.setItem('currencyRates', JSON.stringify({ usd, eur }));

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
        <div className="currency">

            {usdRate && (
                <div>
                    <div>USD/UAH</div>
                    <p> {usdRate.rateBuy.toFixed(2)} /</p>
                    <p> {usdRate.rateSell.toFixed(2)}</p>
                </div>
            )}
            {eurRate && (
                <div>
                    <div>EUR/UAH</div>
                    <p> {eurRate.rateBuy.toFixed(2)} /</p>
                    <p> {eurRate.rateSell.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default CurrencyRates;
